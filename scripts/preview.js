import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const root = join(process.cwd(), 'dist');
const port = Number(process.env.PORT || 4174);
const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
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
}).listen(port, '0.0.0.0', () => console.log(`Preview server running at http://localhost:${port}`));
