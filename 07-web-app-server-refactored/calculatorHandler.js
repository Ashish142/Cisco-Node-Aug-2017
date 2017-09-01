var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	var resource = req.urlData.pathname;
	if (resource === '/calculator'){
		var reqData = req.method === 'POST' ? req.body : req.urlData.query;
			op = reqData.op,
			n1 = parseInt(reqData.n1, 10),
			n2 = parseInt(reqData.n2, 10);

		var result = calculator[op](100,200);
		res.write(result.toString());
		res.end();
	else {
		next();
	}
}