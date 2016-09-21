var net = require('net');

var server = net.createServer();

server.on('connection', function (sock){
	console.log('Nueva conexion');
	console.log('Socket remoto: '+ sock.remoteAddress + ' ' + sock.remotePort);
	console.log('Socket local: '+ sock.localAddress + ' ' + sock.localPort);

	var emit = sock.emit;

	sock.emit = function (event){
		console.log('La conexio emitió el evento tipo %j', event);
		emit.apply(sock, arguments);
	};
});


module.exports = server;
