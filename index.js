const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const cookieSession = require("cookie-session");
// const csurf = require("csurf");
const { hash, compare } = require("./utils/bc");
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

// app.use(csurf());

// app.use(function(req, res, next) {
//     res.set("x-frame-options", "DENY");
//     res.locals.csrfToken = req.csrfToken;
//     next();
// });

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
                // res.json({ matchedPass: false });
                // } else {
                //     res.json("register", {
                //         repeatPass: true
            });
    } else {
        console.log("error, passwords dont match: ");
        res.json({ matchedPass: false });
    }
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
