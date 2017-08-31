//calculator?op=add&n1=100&n2=200

var http = require('http'),
	calculator = require('./calculator'),
	url = require('url'),
	querystring = require('querystring');

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	var queryData = querystring.parse(urlObj.query),
		op = queryData.op,
		n1 = parseInt(queryData.n1, 10),
		n2 = parseInt(queryData.n2, 10);

	var result = calculator[op](100,200);

	res.write(result.toString());
	res.end();
});
server.listen(8080);