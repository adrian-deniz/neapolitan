const fs = require('fs');
const path = require('path');

class Route {
    constructor(req, res) {
      this.req = req;
      this.res = res;
    }
    onRequest(method, url, fun) {
        if(this.req.method === method && this.req.url === url) {
            fun();
        }
    }
    onData(method, url, fun) {
        if(this.req.method === method && this.req.url === url) {
            let body = [];
            this.req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                const obj = JSON.parse(body);
                fun(obj)

            });
        }
    }
    static() {
        let filePath = this.req.url;

        if (filePath == '/') {
            filePath = 'public/index.html';
        }
        else {
            filePath = 'public' + this.req.url;
        }

        let extname = String(path.extname(filePath)).toLowerCase();
        let mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.wasm': 'application/wasm',
            '.ico' : 'image/x-icon',
            '.php' : 'application/php'
        };

        let contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT') {
                    fs.readFile('public/404.html', function(error, content) {
                        this.res.writeHead(404, { 'Content-Type': 'text/html' });
                        this.res.end(content, 'utf-8');
                    }.bind(this));
                }
                else {
                    this.res.writeHead(500);
                    this.res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                }
            }
            else {
                this.res.writeHead(200, { 'Content-Type': contentType });
                this.res.end(content, 'utf-8');
            }
        }.bind(this));
    }
  }

  module.exports = Route;
  
  


