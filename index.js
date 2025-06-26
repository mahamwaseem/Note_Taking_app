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

   else if (method === 'POST' && url.pathname === '/notes') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { title, content } = JSON.parse(body);
      const note = { id: nextId++, title, content };
      notes.push(note);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(note));
    });
  }
   // DELETE /notes/:id
  else if (method === 'DELETE' && url.pathname.startsWith('/notes/')) {
    const id = parseInt(url.pathname.split('/')[2]);
    notes = notes.filter(note => note.id !== id);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `Note ${id} deleted` }));
  }

  // 404 handler
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }

});
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

