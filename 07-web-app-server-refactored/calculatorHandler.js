var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res){
	var resource = req.urlData.pathname;
	if (req.method === 'GET' && resource === '/calculator'){
		var queryData = req.urlData.query,
			op = queryData.op,
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
	}
}