// Import libraries
const express = require('express');
// const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Setup Express and HTTP server
// const app = express();
// const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// // Serve the static HTML file (for the client)
// app.use(express.static(path.join(__dirname, 'public')));

// // Route to serve index.html for the root path
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// WebSocket connection event
wss.on('connection', (ws) => {
    console.log('New client connected');

    // Handle incoming messages
    ws.on('message', (message) => {
        console.log('Received:', message);

        // Broadcast the message to other connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle client disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start server on port 8080
const PORT = 10000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
