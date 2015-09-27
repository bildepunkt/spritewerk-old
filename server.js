var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var http = require('http');
var PORT = 3000;

var serve = serveStatic('examples', {
    index: ['index.html']
});

var server = http.createServer(function(req, res){
    try {
        console.log(req.url);
        serve(req, res, finalhandler(req, res));
    } catch(err) {
        console.log(err);
    }
});

server.listen(PORT, function() {
    console.log("Server listening on: http://localhost:%s", PORT);
});
