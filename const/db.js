
const user = "mute";
const pass = "17admin17";
const dbName = "random_text_storage";

module.exports = {
    dbName,
    url:`mongodb://${user}:${pass}@ds213832.mlab.com:13832/${dbName}`
    
}
