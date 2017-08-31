var http = require('http'),
	fs = require('fs'),
	path = require('path');

var server = http.createServer(function(req, res){
	var resource = path.join(__dirname, req.url === '/' ? '/index.html' : req.url);
	
	console.log('resource -> ', resource);
	if (!fs.existsSync(resource)){
		res.statusCode = 404;
		res.end();
		return;
	}
	var stream = fs.createReadStream(resource, { enconding : 'utf8'});
	/*stream.on('data', function(chunk){
		res.write(chunk);
	});
	stream.on('end', function(){
		res.end();
	})*/
	stream.pipe(res);
});

server.listen(8080);
console.log('Server listening on port 8080');