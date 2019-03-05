var express = require("express");
var app = express(); //bien app thanh 1 doi tuong luu tru exxpress

app.use(express.static("public"));

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb+srv://root:12345A@cluster0-j5ir3.mongodb.net/data_tin_game';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connected...');

    // Get the documents collection
    var database = db.db();
    var collection = database.collection("tin_tuc");
      app.get("/list_tintuc",function(req,res){
      	collection.find({}).toArray(function (err, result){
      if (err) {

      } else if (result.length) {
        res.send(result);
      } else {
        res.send([]);
      }

      });
      //Close connection
      //db.close();
    });

      var collection_2 = database.collection("trang_chu");
      app.get("/list_gamepc",function(req,res){
        var  page = parseInt(req.query.page);
        collection_2.find({}).skip(6*page-6).limit(6).toArray(function (err, result){
      if (err) {
        
      } else if (result.length) {
        res.send(result);
      } else {
        res.send([]);
      }

      });
      //Close connection
      //db.close();
    });
  }
});

app.listen("3333",function(){
	console.log("server is running");
});