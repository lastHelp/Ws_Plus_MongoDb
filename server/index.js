const fs = require('fs');
const http = require('http');


const port = 3000;
const server = http.createServer(function (req,res) {
const pathBaseTemp = './template/index.html';
const streamBaseTemp = fs.ReadStream(pathBaseTemp);
streamBaseTemp.pipe(res);
});

server.listen(port,()=>console.log(`I work in  ${port} port`));