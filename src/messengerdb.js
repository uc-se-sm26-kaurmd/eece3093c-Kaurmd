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

module.exports = { connect };
