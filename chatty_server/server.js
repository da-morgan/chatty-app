// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });


wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.clients.forEach(function each(client) {
        console.log("SIZE",wss.clients.size);
        client.send(JSON.stringify(wss.clients.size));
  });

  ws.on('message', function incoming(data) {
    const parsedData = JSON.parse(data);
    let dataWithId = parsedData;
    dataWithId.id = uuid();
    dataWithId.userCount;
    console.log(dataWithId.userCount);
    stringifiedDataWithId = JSON.stringify(dataWithId);

    wss.broadcast = function broadcast(data) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    };

    wss.broadcast(stringifiedDataWithId);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(wss.clients.size));
    });
  });

});