const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const renewalSubscription = async (req, res, next) => {
  const userId = req.user.id;
  const { subscription } = req.body;
  const sql =
    "UPDATE users SET subscription = " +
    mysql.escape(subscription) +
    " WHERE id = " +
    mysql.escape(userId);
  db.query(sql, [subscription, userId], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return next(err);
    }
    res.json(result);
  });
};

module.exports = renewalSubscription;
