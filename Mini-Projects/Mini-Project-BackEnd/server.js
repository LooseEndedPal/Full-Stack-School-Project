const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {

    // Read user data from a file using fs and path modules
    if (req.method === 'GET' && req.url == '/') {
        fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else if (req.method === 'GET' && req.url === '/api/users') {
        fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on <http://localhost:3000/>');
});