const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); 

db.serialize(() => {
  db.run(`
    CREATE TABLE accounts (
      id INTEGER PRIMARY KEY,
      account_id TEXT,
      balance REAL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

exports.insertAccount = (accountId, balance) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO accounts (account_id, balance) VALUES (?, ?)`;
    db.run(query, [accountId, balance], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ accountId: accountId, balance: balance });
      }
    });
  });
};

exports.getAccountById = (account_id) => {
    console.log("aaccount id is ",account_id);
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM accounts WHERE account_id = ?`;
    db.get(query, [account_id], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        resolve(null); 
      } else {
        resolve(row);
      }
    });
  });
};


exports.getAllAccounts = () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM accounts`;
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };