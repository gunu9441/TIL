module.exports = {
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

//   module.exports.template = template;