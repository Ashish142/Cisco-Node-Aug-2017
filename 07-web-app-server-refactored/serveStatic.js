var fs = require('fs'),
	path = require('path');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json'];
function isStatic(resource){
	var resourceExtn = path.extname(resource);
	return staticExtns.indexOf(resourceExtn) !== -1;
}

module.exports = function(staticResourcePath){
	return function(req, res, next){
		var resource = req.urlData.pathname,
			resourcePath = path.join(staticResourcePath, resource);	
				
		if (isStatic(resource)){
			if (!fs.existsSync(resourcePath)){
				res.statusCode = 404;
				res.end();
			}
			fs.createReadStream(resourcePath).pipe(res);
		} else {
			next();
		}
	}
}