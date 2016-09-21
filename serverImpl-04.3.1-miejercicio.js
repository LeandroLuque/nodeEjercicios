var net = require('net');
var through = require('through2');

var server = net.createServer();

var users = [];

server.on('connection', function (sock){
	console.log('Nueva conexion');
	console.log('Socket remoto: '+ sock.remoteAddress + ' ' + sock.remotePort);
	console.log('Socket local: '+ sock.localAddress + ' ' + sock.localPort);

	users.push(sock);

	sock.setEncoding('utf8');

	sock.on('data', function(data){
		broadcast(data);
	});

	sock.on('end', function (){
		console.log('FIn del socket: ' + sock.remoteAddress + ' ' + sock.remotePort);
	});

	sock.once('close', function (data) {
		console.log('Socket cerrado: ' + sock.remoteAddress + ' ' + sock.remotePort);
	});

	function broadcast(data) {
		for (var user in users){
			if (users[user] != sock){
				console.log("El cliente " + sock.remoteAddress + " envia el mensaje: " + data);
				users[user].write(data);
			}
		}
	};

});


module.exports = server;