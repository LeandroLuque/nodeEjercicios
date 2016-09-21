var net = require('net');
var through = require('through2');

var server = net.createServer();

server.on('connection', function (sock){
	console.log('Nueva conexion');
	console.log('Socket remoto: '+ sock.remoteAddress + ' ' + sock.remotePort);
	console.log('Socket local: '+ sock.localAddress + ' ' + sock.localPort);

	sock.setEncoding('utf8');


	var upperCasing = through.obj(function (str, enc, cb) {
		this.push(str.toUpperCase());
		cb();
	});

	sock.pipe(upperCasing).pipe(sock);

	sock.on('end', function (){
		console.log('FIn del socket: ' + sock.remoteAddress + ' ' + sock.remotePort);
	});

	sock.once('close', function (data) {
		console.log('Socket cerrado: ' + sock.remoteAddress + ' ' + sock.remotePort);
	});

});


module.exports = server;