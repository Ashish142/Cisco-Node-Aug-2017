var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json'];
function isStatic(resource){
	var resourceExtn = path.extname(resource);
	return staticExtns.indexOf(resourceExtn) !== -1;
}

var server = http.createServer(function(req, res){
	var urlData = url.parse(req.url),
		queryData = querystring.parse(urlData.query),
		resource = urlData.pathname;
	if (isStatic(resource)){
		var resourcePath = path.join(__dirname, resource);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else if (urlData.pathname === '/calculator'){
		var op = queryData.op,
			n1 = parseInt(queryData.n1, 10),
			n2 = parseInt(queryData.n2, 10);

		var result = calculator[op](100,200);

		res.write(result.toString());
		res.end();
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);
console.log('Server listening on port 8080!');