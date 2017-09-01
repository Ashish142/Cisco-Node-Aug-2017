var url = require('url'),
	querystring = require('querystring');

module.exports = function(req){
	var urlData = url.parse(req.url);
	urlData.query = querystring.parse(urlData.query);
	req.urlData = urlData;
};