const {MongoClient} = require('mongodb');
const {url} = require('../../const/db');


class DbStorage {
    constructor(dbName,...collectionNames){
        this.dbName = dbName;
        this.collectionNameS = [...collectionNames];
        this.client;
        this.db;
        this.collectionS = [];
        this.cursollS = [];
        this.actualCursolIndex = 0;
    }
   async conect(){
    try{
   this.client= await MongoClient.connect(url,{ useNewUrlParser: true });
   this.db =  await this.client.db(this.dbName);
    } catch(error){
        console.log(error)
        throw error;
    }
    }
    async createCollection(){
        try{
        for(let collectionName of this.collectionNameS) {
            this.collectionS.push(await this.db.collection(collectionName));
        }
    } catch(error){
        console.log(error)
        throw error;
    }
    }
    async createCursoll(){
        try{
        for(let collection of this.collectionS ){
            this.cursollS.push(await  collection.find({},{timeout:true}));
        }} catch(error){
            console.log(error)
            throw error;
        }
    } 
    async  data(){
        try{
            let {actualCursolIndex,cursollS}  = this;
            if(!cursollS.length) {
                await  this.createCollection();
                await  this.createCursoll();
            } else if(!cursollS.some(async cursoll=>await cursoll.hasNext())){
                return false;
            }else if(cursollS.every(cursoll=>cursoll.isClosed())){
                return false;
            }
          
            let actualCursol =  cursollS[actualCursolIndex];
           
            actualCursolIndex = (await actualCursol.hasNext() ) ?  actualCursolIndex : actualCursolIndex++;
            if(actualCursol.isClosed()){
                cursollS.splice(actualCursolIndex,1);
                actualCursolIndex -=1;
            }
            const data = await cursollS[actualCursolIndex].next();
            this.actualCursolIndex = (actualCursolIndex>= cursollS.length-1) ? 0: ++actualCursolIndex;
            return data;

        }catch(err){
            console.log(err)
            throw err;
        }
    }
}

module.exports = DbStorage;