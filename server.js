var express = require('express');
var mongo = require('mongo');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Chat = require('./models');

var app = express();
var PORT = 3000;

var connection = 'mongodb://user:12345@ds137040.mlab.com:37040/bitchfit';
mongoose.connect(connection);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(PORT, function(){
  console.log("connection established on port:", PORT);
});

mongoose.connection.once('open', function(){
  console.log("mongo database connected at ", connection);
});




//GET request handlers
app.get('/api/chatlist', function(req, res){
  Chat.find(function(err, data){
    if(err){
      throw err;
    }
    res.status(200).send(data);
  });
});


//POST request handlers
app.post('/api/addchat', function(req, res){
  var chat = new Chat({
    message: req.body.message,
    date: req.body.date
  });
  chat.save(function(err){
    if(err){
      console.log(err);
      throw err;
    }
  });
});
