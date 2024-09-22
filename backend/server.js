const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('Dati ricevuti dal webhook:', req.body);
  res.status(200).send('Dati ricevuti')
})

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
})
