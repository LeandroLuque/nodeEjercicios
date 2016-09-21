var net = require('net');

var server = net.createServer();

server.on('connection', function (sock){
	console.log('Nueva conexion');
	console.log('Socket remoto: '+ sock.remoteAddress + ' ' + sock.remotePort);
	console.log('Socket local: '+ sock.localAddress + ' ' + sock.localPort);

	sock.setEncoding('utf8');

	sock.pipe(sock);

	sock.on('end', function (){
		console.log('FIn del socket: ' + sock.remoteAddress + ' ' + sock.remotePort);
	});

	sock.once('close', function (data) {
		console.log('Socket cerrado: ' + sock.remoteAddress + ' ' + sock.remotePort);
	});

});


module.exports = server;