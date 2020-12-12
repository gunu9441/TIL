var http = require('http');
var fs = require('fs');
var url = require('url'); /* url이라고 하는 module을 사용할 것이다. url이라는 변수를 통해 사용  */

var app = http.createServer(function(request,response){//address:http://localhost:3000/?id=HTML
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log('1.'+_url);
    console.log(queryData); 
    console.log('2.'+ queryData.id); 

    if(_url == '/'){
      title = 'welcome';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    var template = ``
    fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
      template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="http://localhost:3000/?id=CSS">CSS</a></li>
          <li><a href="http://localhost:3000/?id=Javascript">Javascript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
       console.log('3.' + template);
     });
     console.log('4.'+ template);
     response.end(template);
    
    // console.log(__dirname + url);
    //response.end(template);
    // response.end('egoing : ' + url);
 
});
app.listen(3000);