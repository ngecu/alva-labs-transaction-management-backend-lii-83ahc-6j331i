
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
}); 


db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS transactions`);

  db.run(`
    CREATE TABLE transactions (
      id INTEGER PRIMARY KEY,
      transaction_id TEXT,
      account_id TEXT,
      amount REAL,

      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

exports.insertTransaction = (account_id, amount,transactionId) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO transactions (transaction_id,account_id, amount) VALUES (?,?, ?)`;
    db.run(query, [transactionId,account_id, amount], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ transaction_id: this.lastID, account_id, amount });
      }
    });
  });
};

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM transactions`;
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


exports.getTransactionById = (transaction_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM transactions WHERE id = ?`;
    db.get(query, [transaction_id], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        resolve(null); // Transaction not found
      } else {
        resolve(row);
      }
    });
  });
};
