var net = require('net');

var server = net.createServer();

server.listen(6000, function(){
	console.log("Servidor TCP escuchando en el puerto %j", server.address().port);
});