var restify = require('restify');

var client = restify.createJsonClient({
  url: 'http://localhost:8080',
  version: '~1.0'
});

client.post('/user',{name:'John Doe',address:'no se sabe'},function (err,req,res,obj) {
  if (err) {
    console.error('ops algo pasó. Error: ',err);
  }
  else {
    console.log('POST  "/usr" retornó %j',obj);
  }

  client.post('/user',{name:'Demián Barry',address:'Charcas 54'}, function (err,req,res,obj) {
    if (err) {
      console.error('ops algo pasó. Error: ',err);
    } else {
      console.log('POST  "/usr" retornó %j',obj);
    }

    client.get('/user/1',function (err,req,res,obj) {
      if (err) {
        console.error('Ocurrió el error %j recuperando user 1',err);
      } else {
        console.log('%j "/user/1" recuperado exitosamente',obj);
      }

      client.get('/user/0',function (err,req,res,obj) {
        if (err) {
          console.error('Ocurrió el error %j recuperando user 0',err);
        } else {
          console.log('%j "/user/0" recuperado exitosamente',obj);
        }

        client.put('/user/0',{address:'kentuky 32',country:'USA'},function (err,req,res,obj) {
          if (err) {
            console.error('Ocurrió el error %j modificando el user 0',err);
          } else {
            console.log('La modificación de "/user/0" retornó: %j',obj);
          }

          client.put('/user/1',{country:'Argentina'},function (err,req,res,obj) {
            if (err) {
              console.error('Ocurrió el error %j modificando el user 1',err);
            } else {
              console.log('La modificación de "/user/1" retornó: %j',obj);
            }

            client.get('/',function (err,req,res,obj) {
              if (err) {
                console.error('Error recuperadola lista de usuarios: %j',err);
              } else {
                console.log('Usuarior recuperados: %j',obj);
              }

              client.del('/user/0',function (err,req,res,obj) {
                if (err) {
                  console.error('Error eliminado user 0: %j',err);
                } else {
                  console.log('DEL "/user/0 retorna: %j"',obj);
                }

                client.get('/',function (err,req,res,obj) {
                  if (err) {
                    console.error('Error recuperadola lista de usuarios: %j',err);
                  } else {
                    console.log('Usuarior recuperados: %j',obj);
                  }
                });
              });
            });
          });
        });
      });
    });
  });
});
