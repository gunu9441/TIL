var http = require('http');
var fs = require('fs');
var url = require('url');
function templateHTML(title, list, body){
  return`
  <!doctype html>
   <html>
   <head>
     <title>WEB1 - ${title}</title>
     <meta charset="utf-8">
   </head>
   <body>
     <h1><a href="/">WEB</a></h1>
     ${list}
     ${body}
   </body>
   </html>`;
}
var app = http.createServer(function(request,response){//address:http://localhost:3000/?id=HTML
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(url.parse(_url, true));

    if(pathname === '/'){
      if(queryData.id === undefined){
        fs.readdir('./data', function(error,filelist){
            console.log(filelist)
            var title = "Welcome";
            var description = "Hello, Node.js";
            var i = 0;
            var list = `<ol>`;
            while(i < filelist.length){
              list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
              i += 1;
            }
            list += `</ol>`

            var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
            response.writeHead(200);
            response.end(template);
        })} else {
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        fs.readdir('data/',function(err,filelist){
          var title = queryData.id;
          var list = `<ol>`;
          var i = 0;
          while(i < filelist.length){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i += 1;
          }
          list += `</ol>`

          var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
          response.writeHead(200);
          response.end(template);
        })
       });
      }
    } else {
      response.writeHead(404);
      response.end("Not found");
    }
    
});
app.listen(3000);