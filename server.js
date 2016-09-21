var server = require('./serverImpl-04.3.1-miejercicio');

server.listen(6000, function(){
	console.log("Servidor TCP escuchando en el puerto %j", server.address().port);
});