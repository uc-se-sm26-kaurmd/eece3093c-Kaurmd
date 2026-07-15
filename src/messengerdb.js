// =============================================================================
// EECE/CS 3093C Software Engineering — Lab 3
// messengerdb.js — code skeleton provided by Phu Phung
// complete implementation by Manjinder Kaur
// =============================================================================
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kaurmd:ManjinderkaurDB@messengerdb.liqpzsa.mongodb.net/?appName=MessengerDB"; //replace this with your connection string
const client = new MongoClient(uri);

async function connect (){
  await client.connect();
  console.log('Debug>messengerdb.js: connected to MongoDB server!');
}

let users = client.db('messenger').collection('users');
//'messenger' is the database name, 'users' is the collection name
// change them accordingly if you named them differently
// Use-Case-03: Join Chat — credential check against MongoDB
const find = async (username,password)=>{
  let user = null;
  console.log(`Debug>messengerdb.js: find user '${username}' with password '${password}'`)
  user = await users.findOne({username:username,password:password});
  return user; // null if no match
}
module.exports = { connect, find };