var http = require('http');
const os = require('os');

var handleRequest = function(request, response) {
    console.log('Received request for URL: ' + request.url);

    var version = 'version 1.0.0'

    response.writeHead(200);
    response.end("You've hit a critical app " + os.hostname() + " " + version + " \n");
};

var www = http.createServer(handleRequest);
www.listen(8000);
