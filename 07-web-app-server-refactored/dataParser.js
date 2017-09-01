var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	var urlData = url.parse(req.url);
	urlData.query = querystring.parse(urlData.query);
	req.urlData = urlData;
	if (req.method === 'POST'){
		var rawBody = '';
		req.on('data', function(chunk){
			rawBody += chunk;
		});
		req.on('end', function(){
			req.body = querystring.parse(rawBody);
			next();	
		});
	} else {
		next();
	}
};