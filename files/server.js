var http = require('http');
const os = require('os');

var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  response.end("You've hit " + os.hostname() + " version:1\n");
};

var www = http.createServer(handleRequest);
www.listen(8080);
