const express = require('express');
const router = express.Router();
const {createAccount,getAccountById, getAllAccounts} = require('../controllers/accountController');


router.post('', createAccount);
router.get('/', getAllAccounts);
router.get('/:accountId', getAccountById);


module.exports = router;
