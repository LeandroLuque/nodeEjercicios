var server = require('./serverImpl-01');

server.listen(6000, function(){
	console.log("Servidor TCP escuchando en el puerto %j", server.address().port);
});