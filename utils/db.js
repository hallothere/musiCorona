const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres://postgres:postgres@localhost:5432/users`
);

exports.addRegister = function(first, last, email, password) {
    // console.log("addRegister is working");
    return db.query(
        `INSERT INTO users (first, last, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id`,
        [first, last, email, password]
    );
};

exports.getPass = function(email) {
    return db.query(`SELECT password, id FROM users WHERE email = $1`, [email]);
};

exports.compareEmail = function(email) {
    return db.query(`SELECT email FROM users WHERE email = $1`, [email]);
};
// exports.compareCode = function() {
//     return db.query(
//         `SELECT * FROM password_reset_codes WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'`
//     );
// };

exports.insertCode = function(email, code) {
    return db.query(
        `INSERT INTO password_reset_codes (email, code)
      VALUES ($1, $2)
      RETURNING id`,
        [email, code]
    );
};

exports.getCode = function(email) {
    return db.query(
        `SELECT code FROM password_reset_codes WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes' AND email = $1`,
        [email]
    );
};

exports.getUserDetails = function(id) {
    return db
        .query(`SELECT first, last, id FROM users WHERE id = $1`, [id])
        .then(({ rows }) => rows);
};

//SELECT * FROM my_table
// WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes';
