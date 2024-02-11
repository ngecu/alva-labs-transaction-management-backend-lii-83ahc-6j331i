const { insertAccount, getAccountById,getAllAccounts } = require('../models/accountModel');

exports.createAccount = async (req, res) => {
  const { accountId, balance } = req.body;

  try {
    const account = await insertAccount(accountId, balance);
    res.status(201).json(account); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await getAllAccounts();
    res.status(200).json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getAccountById = async (req, res) => {
  const { accountId } = req.params;

  console.log(req.params);

  try {
    const account = await getAccountById(accountId);
    console.log(account);
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const { accountId: id, balance,account_id } = account;
    res.status(200).json({ accountId: id, balance,account_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
