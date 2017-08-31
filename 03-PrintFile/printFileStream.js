var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', { encoding : 'utf8'});

//ReadableStream  -> open, data, end, close & error

var readCount  = 0;
stream.on('open', function(){
	console.log('sample.txt file opened for reading');
});

stream.on('data', function(chunk){
	++readCount;
	console.log(chunk);
});

stream.on('end', function(){
	console.log('Thats all folks! Job done with ' + readCount + ' reads!!');
});

stream.on('close', function(){
	console.log('data file closed');
});

stream.on('error', function(err){
	console.log('something went wrong', err);
});

console.log('Application end has reached');