const http = require('http');
const Route = require('./modules/route.js');
require('./modules/config.js')();
const email = require('./modules/email.js');
console.log(process.env)

const hostname = process.env.HOST || '127.0.0.1'; // use hostname 127.0.0.1 unless there exists a preconfigured port
const port = process.env.PORT || 3000; // use port 3000 unless there exists a preconfigured port
    
http.createServer((req, res) => {
    const route = new Route(req, res);

    route.onRequest('GET', '/', () => {
        console.log('Hello World!');
    });
    
   
    route.onData('POST', '/form', (data) => {
        email.form(data);
    });

    route.static();

       
    }).listen(port);
    console.log(`Server running at http://${hostname}:${port}/`);
