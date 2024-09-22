/* ------------------------------------------------------------------ */

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
let clients = [];

const app = express();
const port = 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

/* ------------------------------------------------------------------ */

app.use(express.json());

wss.on('connection', (ws) => {
  console.log('Nuovo client connesso');
  clients.push(ws);

  ws.on('close', () => {
    console.log('Client disconnesso');
    clients = clients.filter((client) => client !== ws);
  });
});

app.post('/webhook', (req, res) => {
  console.log('Dati ricevuti dal webhook:', req.body);

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(req.body));
    }
  });

  res.status(200).send('Dati ricevuti');
});

server.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
