
const { insertAccount } = require('../models/accountModel');
const Transaction = require('../models/transactionModel');

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

exports.getAllTransactions = async (req, res) => {
  try {
    console.log("fetching transactions");
    const transactions = await Transaction.getAll();
    console.log("transioctio is",transactions);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createTransaction = async (req, res) => {
  
  const { amount } = req.body;

  const transactionId = uuid(); 
  const account_id = uuid()
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!req.is('application/json')) {
    return res.status(415).json({ error: 'Unsupported Media Type. Request body must be in JSON format.' });
  }

  if(!account_id){
    return res.status(400).json({ error: 'Bad request status code should be returned in case of missing account_id' });

  }

  if(!amount){
    return res.status(400).json({ error: 'Bad request status code should be returned in case of missing amount' });

  }

  if (typeof account_id !== 'string') {
    return res.status(400).json({ error: 'Bad request status code should be returned in case of malformed account_id' });
  }


  try {
    console.log("reaching m1");
    const transaction = await Transaction.insertTransaction(account_id, amount, transactionId);
    insertAccount(account_id,amount)
    res.status(201).json({ transaction_id: transaction.transaction_id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTransactionById = async (req, res) => {
  const { transaction_id } = req.params;

  try {
    const transaction = await Transaction.getTransactionById(transaction_id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const { transaction_id: id, account_id, amount } = transaction;
    res.status(200).json({ transaction_id: id, account_id, amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
