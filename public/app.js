angular.module('chatapp', [])

.factory("Chats", function($http, $interval){
  var getChats = function() {
    return $http ({
      method: 'GET',
      url: '/api/chatlist'
    }).then(function(res){
      return res.data;
    });
  };

  var addChat = function(chat){
    var jsonchat = JSON.stringify(chat);
    return $http ({
      method: 'POST',
      url: '/api/addchat',
      data: jsonchat
    });
  };

  return {
    getChats: getChats,
    addChat: addChat
  };


})
.controller('GetChatController', function($scope, Chats, $interval){
  Chats.getChats()
  .then(function(data){
    $scope.chats = data;
  });

  $(document).ready(function(){
    setInterval(function() {
      Chats.getChats()
      .then(function(data){
        $scope.chats = data;
      });
    }, 1000)
  });
})

//need to fix interval to refresh screen.

.controller('AddChatController', function($scope, Chats){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;

  $scope.addChatButton = function(){
    var chat = {
      message: $scope.message,
      date: dateTime
    }
    console.log(chat);
    Chats.addChat(chat);
  };
})

$(document).ready(function(){
  $('#chatboxbutton').click(function(){
   $('#chatbox').val('');
  });


})



