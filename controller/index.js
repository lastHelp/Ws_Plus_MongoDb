const fs = require('fs');
const db = require('../lib/class/bgStorageS');

module.exports = async function (req,res) {
    try{
const pathBaseTemp = './template/index.html';
const streamBaseTemp = fs.ReadStream(pathBaseTemp);
const dbName = "random_text_storage";
const collectName = ["collect1","collect2"];
const d = new db(dbName,...collectName);
await d.conect();
let i = 1;
await (async function () {
while(true) {
    var x = await d.data();
    console.log(x,"SEE me ",i++);
   if(x===false) {
       break
   }
}
})()
streamBaseTemp.pipe(res);
    } catch (err){
        console.log(err)
        res.end(err.message);
    }
}