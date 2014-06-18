var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var express = require("express"),

app = express(),
server = require("http").createServer(app),
io = require("socket.io").listen(server);
app.use(express.static(__dirname + "/public"));
io.sockets.on("connection", function(socket) {
	socket.emit("ping");
	socket.on("pong", function() {
		console.log("PONG!");
	});
});

server.listen(server_port, server_ip_address, function () {
	console.log( "Listening on " + server_ip_address + ", server_port " + port )
});