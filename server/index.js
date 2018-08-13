
const http = require('http');
const controller = require('../controller');
const socket =  require("socket.io");
const app = http .createServer(controller);
const io = socket.listen(app);
const DbStorage = require('../lib/class/bgStorageS');
const port = 3000;

app.listen(port,()=>console.log(`I work in  ${port} port`));


io.sockets.on('connection',async  function (socket) {
    console.log('new user conect');
    const dbName = "random_text_storage";
    const collectName = ["collect1","collect2"];

    const randomTextStorage = new DbStorage(dbName,...collectName);
    await randomTextStorage.conect();
    await (async function () {
    while(true) {
      const response = await randomTextStorage.data();
      const sendData = JSON.stringify(response);
        socket.emit('getRow', sendData );
     if(!response) {
        socket.emit('finally', {});
         break
     }
  }
  })();
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});