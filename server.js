var SERVER_IP_ADDRESS = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var SERVER_PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000

var path = require('path');
var express = require("express");
var app = express();

console.log("server ip: "+SERVER_IP_ADDRESS);
console.log("server port: "+SERVER_PORT);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
	console.log("/");
	res.render('index', { title: 'Socket-IO Test',
						  server: SERVER_IP_ADDRESS,
						  port: SERVER_PORT});
});


server = require("http").createServer(app),
io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket) {
	socket.emit("ping");
	socket.on("pong", function() {
		console.log("PONG!");
	});
});

server.listen(SERVER_PORT, SERVER_IP_ADDRESS, function () {
	console.log( "Listening on " + SERVER_IP_ADDRESS + ", server_port " + SERVER_PORT )
});