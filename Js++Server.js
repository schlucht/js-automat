'use strict'

const hostname = '127.0.0.1';
const HTTP = require('http');
const FS = require('fs');
const PORT = 2010;
const INFO_TO_CONSOLE = true;

const FDB = require('./FDB.js');
var fdb = new FDB();

try {
    const SERVER = HTTP.createServer((req, res) => {
        if (INFO_TO_CONSOLE) {
            console.log('req.url', req.url);
        }
        if((req.url[1] === '[') && (req.url.length > 48)) {
            return;
        } else {
            BrowserRequest(req, res);
            return;
        }
    }).listen(PORT, hostname, () => {
        console.log(`Server is running at http://${hostname}:${PORT}\nPath: ${__dirname}`);
    });
}catch (e) {
    console.log('SERVER::catch: ', e);
}

function BrowserRequest(req, res) {
    if (INFO_TO_CONSOLE) {
      console.log('BrowserRequest::req.url: ' + req.url, __dirname);
    }
    if (req.url === '/JS++') {
      FS.createReadStream(__dirname + '/index.html').setEncoding('utf8').pipe(res);
      res.writeHead(200, { "Content-Type": "text/html" });
    } else {
      if (req.url === '/JS++.js') {
        FS.createReadStream(__dirname + '/JS++.js').setEncoding('utf8').pipe(res);
        res.writeHead(200, { "Content-Type": "text/plain" });
      } else {
        if (req.url === '/Main.js') {
          FS.createReadStream(__dirname + '/Main.JS').setEncoding('utf8').pipe(res);
          res.writeHead(200, { "Content-Type": "text/plain" });
        } else {
          if (req.url === '/Logo.png') {
            FS.readFile(__dirname + '/Logo.png', (err, data) => {
              if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end('Request: ' + req.url + ' is unknow or not found Logo');
              } else {
                res.writeHead(200, { "Content-Type": "image/jpeg/png/ico" });
                res.end(data);
              }
            });
          } else {
            console.log('Browser request not found: ' + req.url + " error .... ");
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end('Request: ' + req.url + ' is unknow, sorry, tray again');
          }
        }
      }
    }
  }