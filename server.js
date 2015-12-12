var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var wav = require('wav');
var Speaker = require('speaker');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('horn', function() {
  	//play horn
  	console.log("HORN");
  	var file = fs.createReadStream('air-horn.wav');
  	var reader = new wav.Reader();

  	// the "format" event gets emitted at the end of the WAVE header
  	reader.on('format', function (format) {

  	  // the WAVE header is stripped from the output of the reader
  	  reader.pipe(new Speaker(format));
  	});

  	// pipe the WAVE file to the Reader instance
  	file.pipe(reader);

  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});