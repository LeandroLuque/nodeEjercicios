  var restify = require('restify');

  //state
  var next_user_id = 0;
  var users = {};

  //server
  var server = restify.createServer({
    name: 'myApp',
    version: '1.0.0'
  });

  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());

  server.get('/',function (req,res,next) {
    res.writeHead(200,{'content-type':'aplication/json; charset=utf-8'});
    res.end(JSON.stringify(users));
    return next();
  });

  server.get('/user/:id',function (req,res,next) {
    res.writeHead(200,{'content-type':'aplication/json; charset=utf-8'});
    res.end(JSON.stringify(users[parseInt(req.params.id)]));
    return next();
  });

  server.post('/user',function (req,res,next) {
    var user = req.params;
    user.id = next_user_id++;
    users[user.id] = user;
    res.writeHead(200,{'content-type':'aplication/json; charset=utf-8'});
    res.end(JSON.stringify(user));
    return next();
  });

  server.put('/user/:id',function (req,res,next) {
    var user = users[req.params.id];
    var changes = req.params;
    console.log('user es: %j',user);
    console.log('changes es %j',changes);
    delete changes.id;
    for (var x in changes) {
      console.log('x es %j',x);
      user[x] = changes[x];
    }
    res.writeHead(200,{'content-type':'aplication/json; charset=utf-8'});
    res.end(JSON.stringify(true));
    return next();
  });

  server.del('/user/:id',function (req,res,next) {
    delete users[parseInt(req.params.id)];
    res.writeHead(200,{'content-type':'aplication/json; charset=utf-8'});
    res.end(JSON.stringify(true));
    return next();
  });

  server.listen(8080,function () {
    console.log('%s escuchando en %s',server.name,server.url);
  });
