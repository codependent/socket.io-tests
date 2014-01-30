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
server.listen(3000);