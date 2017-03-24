var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    message: String,
    date: String
});

var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;