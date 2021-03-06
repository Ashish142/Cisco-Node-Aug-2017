var http = require('http'),
	path = require('path'),
	app = require('./app');
	dataParser = require('./dataParser'),
	logger = require('./logger'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');

app.use(logger);
app.use(dataParser);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(calculatorHandler);
app.use(notFoundHandler);

http.createServer(app).listen(8080);
console.log('Server listening on port 8080!');