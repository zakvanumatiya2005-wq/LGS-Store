const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8080;
const FOLDER = __dirname;

// Detect local LAN IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '') reqPath = '/dukaan_app.html';

  const filePath = path.join(FOLDER, reqPath);
  const ext = path.extname(filePath).toLowerCase();

  const mimeMap = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 File Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': mimeMap[ext] || 'application/octet-stream' });
      res.end(data);
    }
  });
});

const localIP = getLocalIP();

server.listen(PORT, '0.0.0.0', () => {
  console.log('========================================================');
  console.log('  🏪 DukaanOS Mobile & Network Server is Live!           ');
  console.log('========================================================');
  console.log(`  📱 Mobile Phone Par Ye Link Kholein:                   `);
  console.log(`     👉 http://${localIP}:${PORT}                       `);
  console.log('');
  console.log(`  💻 Computer Par Ye Link:                              `);
  console.log(`     👉 http://localhost:${PORT}                        `);
  console.log('========================================================');
  console.log('  Note: Phone aur Computer ek hi Wi-Fi par hone chahiye! ');
  console.log('  Press Ctrl+C to close server.                         ');
});
