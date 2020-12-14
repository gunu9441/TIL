var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var template = {
  HTML: function(title, list, body, control) {
    return `
    <!doctype html>
     <html>
     <head>
       <title>WEB1 - ${title}</title> 
       <meta charset="utf-8">
     </head>
     <body>
       <h1><a href="/">WEB</a></h1>
       ${list}
       ${control}
       ${body}
     </body>
     </html>`;
  },
  LIST: function(filelist) {
    var i = 0;
    var list = `<ol>`;
    while (i < filelist.length) {
      list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i += 1;
    }
    list += `</ol>`;
    return list;
  }
}
var app = http.createServer(function (request, response) {
  //address:http://localhost:3000/?id=HTML
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  // console.log('1. ',_url);
  var pathname = url.parse(_url, true).pathname;
  // console.log(pathname)
  // console.log(url.parse(_url, true));

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, filelist) {
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = template.LIST(filelist);
        var control = '<a href="/create">create</a>'

        var html = template.HTML(
          title,
          list,
          `<h2>${title}</h2><p>${description}</p>`,
          control
        );
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, description) {
        fs.readdir("data/", function (err, filelist) {
          var title = queryData.id;
          var list = template.LIST(filelist);
          var control = `
          <a href="/create">create</a> 
          <a href ="/update?id=${title}">update</a> 
          <form action="/delete_process" method="POST">
            <input type="hidden" name='id' value = ${title}>
            <input type="submit" value="delete">
          </form>
          `
          var html = template.HTML(
            title,
            list,
            `<h2>${title}</h2><p>${description}</p>`,
            control
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (error, filelist) {
      var title = "Web-create";
      var list = template.LIST(filelist);
      var html = template.HTML(
        title,
        list,
        `
      <form action="/create_process" method="POST">
        <p><input type="text" name="title" placeholder="title"></p>
        <p>
            <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
            <input type="submit">
        </p>
        </form>
      `, ` `
      );

      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      console.log(body);
      console.log(post);

      fs.writeFile(`data/${title}`, description, "utf8", 
      function (err) {
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end("success"); // redirection
      });
    });
  } else if (pathname == "/update"){
    fs.readFile(`data/${queryData.id}`, "utf8", function (err, description) {
      fs.readdir("data/", function (err, filelist) {
        var title = queryData.id;
        var list = template.LIST(filelist);
        var control = `<a href="/create">create</a> <a href ="/update?id=${title}">update</a>`
        var html = template.HTML(
          title,
          list,
          `<form action="/update_process" method="POST">
            <input type ="hidden" name ="id" value = "${title}">
            <p><input type="text" name="title" placeholder="title" value ="${title}"></p>
            <p>
                <textarea name="description" placeholder="description">"${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>
          `,
          control
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  }else if(pathname==`/update_process`){
    var body =``
    request.on('data', function(data){
      body += data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`,`data/${title}`,function(error){
        fs.writeFile(`data/${title}`,description,`utf8`, function(error){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });
    }); 
  } else if(pathname==`/delete_process`){
      var body =``
      request.on('data',function(data){
        body += data;
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var id = post.id;
        fs.unlink(`data/${id}`, function(error){
          response.writeHead(302, {Location: `/`});
          response.end();
        })
      })
  }else {
    response.writeHead(404);
    response.end("Not found");
  }
});

app.listen(3000);
