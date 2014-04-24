var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(8082);

var time=0;
var pagesocket;
io.sockets.on('connection', function (socket) {
  
  socket.on('start',function(data){
  	   pagesocket = socket;    	
  });
  
  socket.on('ud',function(data){
  	   text = data.message; 
  	   pagesocket.emit("col",{message:"38"});   	
  });
  socket.on('dd',function(data){
  	   text = data.message; 
  	   pagesocket.emit("col",{message:"40"});   	
  });
  socket.on('rd',function(data){
  	   text = data.message; 
  	   pagesocket.emit("col",{message:"39"});   	
  });
  socket.on('ld',function(data){
  	   text = data.message; 
  	   pagesocket.emit("col",{message:"37"});   	
  });
  
  socket.on('stop',function(data){
  	   text = data.message; 
  	   pagesocket.emit("del",{message:"stop"});   	
  });

  
  socket.on('dan1',function(data){
  	   text = data.message; 
  	   pagesocket.emit("col",{message:"90"});   	
  });
  socket.on('dan2',function(data){
  	   text = data.message; 
  	   pagesocket.emit("col",{message:"88"});   	
  });
  socket.on('dan3',function(data){
  	   text = data.message; 
  	   pagesocket.emit("col",{message:"67"});   	
  });
  
  socket.on('mes', function (from, msg) {
  	 time++;
    console.log('I received a private message by ', from, ' saying ', msg);
    socket.emit('back',{message:time});
  });
});

