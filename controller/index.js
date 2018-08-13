const fs = require('fs');

module.exports = async function (req,res) {
    try{
    const pathBaseTemp = './static/template/index.html';
    const streamBaseTemp = fs.ReadStream(pathBaseTemp);

  
streamBaseTemp.pipe(res);
    } catch (err){
        console.log(err)
        res.end(err.message);
    } 
}