module.exports = {
    pageForm: function(list, name, description,control){
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>self_introduction_${name}</title>
            <link rel="stylesheet" href="style.css"/>
            <script src="./color.js"></script>

        </head>
        <body>
            <h1>Welcome to <a href="/">gunu's</a> page!</h1>
            <h2>Let me know U!</h2>
            ${list}
            ${control}
            <h3>${name}</h3>
            ${description}
            </div> 
        </body>
        </html>
        `
    },
    pageList: function(filelist){
        list =`<ol>`
        var i = 0;
        while(i < filelist.length){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i += 1;
        }
        list += '</ol>';
        return list;
    }
}