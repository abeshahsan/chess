// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Enable CORS for all routes
    const corsMiddleware = cors({
      origin: 'http://localhost:5173', // Allow requests from your frontend
      methods: ['GET', 'POST', 'OPTIONS'], // Allow the specified methods
      allowedHeaders: ['Content-Type'], // Allow the specified headers
    });
    corsMiddleware(req, res, () => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
