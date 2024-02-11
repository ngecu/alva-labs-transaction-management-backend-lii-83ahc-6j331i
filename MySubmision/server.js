const express = require('express');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes');
const accountRoutes = require('./routes/accountRoutes');

const app = express();
const PORT = 8080;


app.use(bodyParser.json());

app.use('/ping', (req, res) => {
  res.status(200).send('The service is up and running.');
});


app.use('/transactions', transactionRoutes);
app.use('/accounts', accountRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
