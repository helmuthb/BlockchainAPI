const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Blockchain } = require('./simpleChain.js');
const blockchain = new Blockchain();

var terminating = false;

app.use(bodyParser.json());

app.get('/block/:height', (req, res) => {
  try {
    const height = parseInt(req.params.height);
    const block = blockchain.getBlock(height);
    res.send(block);
  }
  catch (exp) {
    res.status(500).send({ 
      error: 'Could not load block',
      exception: JSON.stringify(exp)
    });
  }
});

app.post('/block', (req, res) => {
  try {
    const block = req.body;
    blockchain.addBlock(block);
    const height = blockchain.getBlockHeight();
    const realBlock = blockchain.getBlock(height);
    res.send(realBlock);
  }
  catch (exp) {
    console.log(exp);
    res.status(500).send({ 
      error: 'Could not save block',
      exception: JSON.stringify(exp)
    });
  }
});

const server = app.listen(
  8000,
  "localhost",
  () => console.log('Blockchain API listening on port 8000'));

process.on("SIGINT", () => {
  if (!terminating) {
    terminating = true;
    if (blockchain)
    console.log("Closing Blockchain DB");
    blockchain.close().then(() => {
      console.log("Terminating server");
      server.close((() => {
        process.exit();
      }));
    });
  }
});
