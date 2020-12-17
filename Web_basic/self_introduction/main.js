var http = require('http');
var url = require('url');

var app = http.createServer(function(request,response){
    _url = request.url;

    queryData = url.parse(_url,'true').query;
    pathname = url.parse(_url,'true').pathname;
    
    response.writeHead(200);
    response.end('success');
    }
);

app.listen(3000);