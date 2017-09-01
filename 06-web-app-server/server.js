var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	path = require('path'),
	querystring = require('querystring'),
	calculator = require('./calculator');

/*
0. logger.js
1. dataParser.js
2. serveStatic.js
3. calculatorHandler.js
4. notFoundHandler.js
*/

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json'];
function isStatic(resource){
	var resourceExtn = path.extname(resource);
	return staticExtns.indexOf(resourceExtn) !== -1;
}

var server = http.createServer(function(req, res){
	var urlData = url.parse(req.url),
		queryData = querystring.parse(urlData.query),
		resource = urlData.pathname;
	console.log(req.method + '\t' + resource);
	if (isStatic(resource)){
		var resourcePath = path.join(__dirname, resource);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else if (req.method === 'GET' && resource === '/calculator'){
		var op = queryData.op,
			n1 = parseInt(queryData.n1, 10),
			n2 = parseInt(queryData.n2, 10);

		var result = calculator[op](100,200);

		res.write(result.toString());
		res.end();
	} else if (req.method === 'POST' && resource === '/calculator'){
		var rawBody = '';
		req.on('data', function(chunk){
			rawBody += chunk;
		});
		req.on('end', function(){
			var bodyData = querystring.parse(rawBody);
				op = bodyData.op,
				n1 = parseInt(bodyData.n1, 10),
				n2 = parseInt(bodyData.n2, 10);

			var result = calculator[op](100,200);

			res.write(result.toString());
			res.end();	
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);
console.log('Server listening on port 8080!');