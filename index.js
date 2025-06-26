const http = require('http');
const { URL } = require('url');

let notes = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;

  // GET /notes
  if (method === 'GET' && url.pathname === '/notes') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(notes));
  }
});

