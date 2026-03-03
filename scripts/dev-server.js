import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json' };

http.createServer(async (req, res) => {
  try {
    const urlPath = req.url === '/' ? '/index.html' : req.url;
    const filePath = join(root, urlPath.split('?')[0]);
    const content = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mime[extname(filePath)] || 'text/plain' });
    res.end(content);
  } catch {
    const content = await readFile(join(root, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
  }
}).listen(port, '0.0.0.0', () => console.log(`Dev server running at http://localhost:${port}`));
