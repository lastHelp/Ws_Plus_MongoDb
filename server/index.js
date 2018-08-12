
const http = require('http');
const controller = require('../controller')

const port = 3000;
http.createServer(controller).listen(port,()=>console.log(`I work in  ${port} port`));
