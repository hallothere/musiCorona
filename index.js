const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const { hash, compare } = require("./utils/bc");
const { sendEmail } = require("./ses");
const cryptoRandomString = require("crypto-random-string");
const secretCode = cryptoRandomString({
    length: 6
});
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const s3Url = require("./config");
const amazonURL = s3Url.s3Url;

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

// console.log(secretCode);
// const { requireLoggedOutUser } = require("./utils/middleware");

app.use(express.static("./public"));
app.use(express.json());

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

// app.use(function(req, res, next) {
//     if (!req.session.userId) {
//         res.redirect("/welcome");
//     } else {
//         next();
//     }
// });

app.use(csurf());

app.use(function(req, res, next) {
    res.set("x-frame-options", "DENY");
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// app.use(function(req, res, next) {
//     if (
//         !req.session.userId &&
//         req.url !== "/welcome" &&
//         req.url !== "/login"
//     ) {
//         res.redirect("/register");
//     } else {
//         next();
//     }
// });

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    }
    res.sendFile(__dirname + "/index.html");
});

app.post("/welcome", (req, res) => {
    // console.log("req.body: ", req.body);
    const { password2, password, first, last, email } = req.body;
    console.log("password: ", password, "password2: ", password2);
    if (password !== "" && password === password2) {
        hash(password)
            .then(hashedPw => {
                db.addRegister(first, last, email, hashedPw)
                    .then(response => {
                        req.session.userId = response.rows[0].id;
                        console.log("req.session.userId: ", req.session.userId);
                        // })
                        // .then(response => {
                        // req.session.userId = response.rows[0].id;
                        // console.log("req.session.userId: ", req.session.userId);
                        // console.log("result from db.addRegister: ", result);
                        // if (first && last && email && hashedPw) {
                        console.log("registration succeed");
                        res.sendStatus(200);
                        // } else {
                        //     console.log("error in filling out the forms");
                        //     res.sendStatus(500);
                        // }
                    })
                    .catch(err => {
                        console.log("error in filling out the forms: ", err);
                        res.json({ filledForms: false });
                        // res.redirect("/");
                    });
                // });
            })
            .catch(err => {
                console.log("error in hashing the password: ", err);
                res.json({ hashedPass: false });
                // } else {
                //     res.json("register", {
                //         repeatPass: true
            });
    } else {
        console.log("error, passwords dont match: ");
        res.json({ matchedPass: false });
    }
});

app.get("/login", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    }
    res.sendFile(__dirname + "/index.html");
});

app.post("/login", (req, res) => {
    const { first, last } = req.body;
    req.session.first = first;
    req.session.last = last;
    const { email, password } = req.body;
    // if (email === "") {
    //     console.log("no email address");
    //     res.json({ email: false });
    // }
    db.getPass(email)
        .then(response => {
            req.session.userId = response.rows[0].id;
            const hashedPwInDb = response.rows[0].password;
            console.log("hashedPwInDb: ", hashedPwInDb);
            compare(password, hashedPwInDb)
                .then(matchValue => {
                    if (matchValue) {
                        res.json({ passwordMatch: true });
                    } else {
                        res.json({
                            passwordMatch: false
                        });
                    }
                })
                .catch(err => {
                    console.log("err in compare: ", err);
                });
        })
        .catch(err => {
            console.log("err in db.getpass: ", err);
            res.json({
                errinGetpass: true
            });
        });
});

// app.get("/password/reset/start", (req, res) => {
//     if (req.session.userId) {
//         res.redirect("/");
//     }
//     res.sendFile(__dirname + "/index.html");
// });

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    db.compareEmail(email)
        .then(result => {
            console.log("result: ", result);
            let verEmail = result.rows[0].email;
            console.log("verEmail: ", verEmail);
            db.insertCode(verEmail, secretCode)
                .then(() => {
                    sendEmail(verEmail, "your code", secretCode)
                        .then(() => {
                            res.json({ codeSent: true });
                        })
                        .catch(err => {
                            console.log("err in sendEmail: ", err);
                        });
                })
                .catch(err => {
                    console.log("err in db.insertCode: ", err);
                });
            // }
        })
        .catch(err => {
            console.log("err in db.compareEmail: ", err);
            res.json({ errInDbCompareEmail: true });
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    // console.log("filename: ", filename);
    if (req.file) {
        db.insertURL(filename, amazonURL, req.session.userId)
            .then(result => {
                console.log("result from db.insertURL: ", result);
                res.json({ result });
            })
            .catch(err => {
                console.log("err in db.insertURL: ", err);
            });
        // let url = amazonURL + filename;
        // console.log("url: ", url);
        // res.json({ url: url });
    }
});

app.post("/password/reset/verify", (req, res) => {
    const { code, password, email } = req.body;
    db.getCode(email)
        .then(result => {
            // console.log("result.rows: ", result.rows);
            let secondCode = result.rows[result.rows.length - 1].code;
            console.log(
                "secondCode (code sent and allready in database): ",
                secondCode
            );
            if (code === secondCode && password !== "") {
                console.log("codes are equal, the new password is: ", password);
                hash(password)
                    .then(hashedPw => {
                        console.log("new hashed pw and id: ", hashedPw, email);
                        db.updatePass(hashedPw, email)
                            .then(() => {
                                res.json({ passwordChanged: true });
                            })
                            .catch(err => {
                                console.log(
                                    "error in updating the password: ",
                                    err
                                );
                                res.json({ passwordChanged: false });
                            });
                    })
                    .catch(err => {
                        console.log("error in hashing the password: ", err);
                        res.json({ hashedPass: false });
                    });
            }
        })

        .catch(err => {
            console.log("err in db.getCode: ", err);
            res.json({ code: false });
        });
});

app.get("/user", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    }
    let id = req.session.userId;
    db.getUserDetails(id).then(result => {
        console.log("result from getUserDetails: ", result[0]);
        let details = result[0];
        res.json({ details });
    });
});

// DONT DELETE THIS
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    }
    res.sendFile(__dirname + "/index.html");
});

// DONT DELETE THIS

app.listen(8080, function() {
    console.log("I'm listening.");
});

//command to search for the database: history | grep git
//sudo service postgresql start

// res.json({
//     id: 1,
//     first: rows[0].first,
//     last: rows[0].last,
//     image: rows[0].image || '/default.png'
// })
