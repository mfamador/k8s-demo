var http = require('http');
const os = require('os');

var handleRequest = function(request, response) {
    console.log('Received request for URL: ' + request.url);

    var version = '2.1.1'

    const msgs = new Map();
    const codes = new Map();
    
    codes.set('1.0.0', 200)
    codes.set('1.1.0', 200)
    codes.set('1.1.1', 500)
    codes.set('2.0.0', 200)
    codes.set('2.1.0', 200)
    codes.set('2.1.1', 500)

    ver = '1.0.0'
    msgs.set(ver, `
    -----------------------------------------
   < critical app version ` + version + ` returned ` + codes.get(ver) + ` >
    -----------------------------------------
    `)
   
    ver = '1.1.0'
    msgs.set(ver, `
    -----------------------------------------
   < critical app version ` + version + ` returned ` + codes.get(ver) + ` >
    -----------------------------------------
            \\   ^__^
             \\  (oo)\_______
                (__)\\       )\\/\\
                    ||----w |
                    ||     ||
    `)
   
    ver = '1.1.1'
    msgs.set(ver, `
    -----------------------------------------
   < critical app version ` + version + ` returned ` + codes.get(ver) + ` >   ¯\\_(ツ)_/¯ 
    -----------------------------------------
            \\   ^__^
             \\  (xx)\_______
                (^^)\\       )\\/\\
                 >===----w ==<
    `)

    ver = '2.0.0'
    msgs.set(ver, `
    -----------------------------------------
   < critical app version ` + version + ` returned ` + codes.get(ver) + ` >
    -----------------------------------------
            \\    ,-^-.
             \\   !oYo!
              \\ /./=\\.\\______
                   ##        )\\/\\
                    ||-----w||
                    ||      ||
    `)

    ver = '2.1.0'
    msgs.set(ver, `
    -----------------------------------------
   < critical app version ` + version + ` returned ` + codes.get(ver) + ` >
    -----------------------------------------
            \\    ,-^-.
             \\   !oYo!
              \\ /./=\\.\\______
                   ##        )\\/\\
                    ||-----w||
                    ||      ||
    `)

    ver = '2.1.1'
    msgs.set(ver, `
    -----------------------------------------
   < critical app version ` + version + ` returned ` + codes.get(ver) + ` >   ¯\\_(ツ)_/¯ 
    -----------------------------------------
            \\    ,-^-.
             \\   !xYx!
              \\ /./=\\.\\______
                   ##        )\\/\\
                >==-----w==<
    `)
    
    response.writeHead(codes.get(version));
    response.end(msgs.get(version));
};

var www = http.createServer(handleRequest);
www.listen(8000);

//   ¯\\_(ツ)_/¯ 