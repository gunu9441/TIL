var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var template = require('./Template.js');
const { on } = require('process');


var app = http.createServer(function(request,response){
    _url = request.url;

    queryData = url.parse(_url,true).query;
    pathname = url.parse(_url,true).pathname;
    console.log('1',pathname);
    console.log('2',queryData);
    console.log('3',queryData.id);
    if(pathname == '/'){
        if(queryData.id == undefined){
            fs.readdir('./data', function(error, filelist){
                var list = template.pageList(filelist);//이름출력
                var control = `<a href="/create">create</a>`
                var template_form = template.pageForm(//page 출력
                    list, 
                    `gunu`,
                    `My location
                    I live in south korea which many people want to travel in.
                    My hobby
                    I really enjoy playing computer games such as rpg or shootings.
                    If you want to join with me, send me a message to discuss time we can make!
                    My dream
                    I want to be a programmer who can make contributions to opensource communities.
                    What is your dream? and why do you follow that dream?
                    My favorite food
                    Hmm... Actually, it is so difficult topic that there are many foods that I like...
                    One of my choices is... pizza? I really like it because it have many kinds of ingredients
                    and favors which make me pleased. when I eat special galic sauce on it, it is really delicious.
                    Actually, I am very starving now... This is best  sauce what I ever had
                    My family
                    My family is mom, dad, my youngerbrother. At the moment, My brother takes call of duty.
                    Therefore, my family is look forward to see him as soon as possible. However, thesedays,
                    There is an epidemic called corona that everyone is afraid of. We have to understand this
                    severe situation and prepare other more serious illnesses.
                    `,
                    control 
                    );
                response.writeHead(200);
                response.end(template_form);
            })
        } else {//queryData.id의 값이 존재하는 경우
            fs.readdir('./data', function(error, filelist){
                fs.readFile(`./data/${queryData.id}`,"utf8", function(error,description){
                    var list = template.pageList(filelist);//이름출력
                    var name = queryData.id; //참여자 이름
                    var control = `
                        <a href="/create">create</a> 
                        <a href="/update?id=${name}">update</a>
                        <form action="/delete_process" method="POST">
                            <input type="hidden" name="id" value=${name}>
                            <input type="submit" value='delete'>
                        </form>
                        `;
                    var template_form = template.pageForm(list, name, description, control);//page 생성
                    response.writeHead(200);
                    response.end(template_form);
                })
            })
        }
    } else if (pathname == '/create'){
        fs.readdir('./data', function(error,filelist){
            var list=template.pageList(filelist);
            var name=`create`;
            var create_form=`
                <form action="/create_process" method='POST'>
                    <p><input type ="text" name="name" placeholder="name"></p>
                    <p><textarea name="description" placeholder="description"></textarea></p>
                    <p><input type ="submit"></p>
                </form>
            `;
            template_form = template.pageForm(list, name, create_form,``);
            response.writeHead(200);
            response.end(template_form);
        })  
    } else if (pathname == '/create_process'){
        order =``;
        request.on(`data`,function(data){
            order += data;
        });
        
        request.on(`end`,function(){
            var POST = qs.parse(order);
            var name = POST.name;
            var description = POST.description;
            fs.writeFile(`data/${name}`, description,"utf8", function(error){
                response.writeHead(302,{Location: `/?id=${name}`});
                response.end("success")
            })
        })
    } else if (pathname == '/update'){
        fs.readdir(`./data`,function(error, filelist){
           fs.readFile(`./data/${queryData.id}`, 'utf8', function(error, description){
                var name = queryData.id;
                var list = template.pageList(filelist);
                var update_form=`
                    <form action="/update_process" method='POST'>
                        <input type="hidden" name="id" value="${name}">
                        <p><input type="text" name="name" value = ${name}></p>
                        <p><textarea name="description">${description}</textarea></p>
                        <p><input type="submit"></p>
                    </form>
                `
                template_form=template.pageForm(list, name, update_form,``);
                response.writeHead(200);
                response.end(template_form);
           })
        });
    } else if (pathname == '/update_process'){
        var order = ``;
        request.on(`data`, function(data){
            order += data;
        });
        request.on(`end`, function(){
            var POST = qs.parse(order);
            var id = POST.id;
            var name = POST.name;
            var description = POST.description;
            console.log('**', id, name, description)
            fs.rename(`./data/${id}`,`./data/${name}`,function(error){
                fs.writeFile(`./data/${name}`,description,'utf8',function(error){
                    response.writeHead(302, {Location: `/?id=${name}`});
                    response.end();
                });
            });
        });
    } else if (pathname == '/delete_process'){
        var order =''
        request.on('data',function(data){
            order += data;
        });
        request.on('end',function(){
            var post = qs.parse(order);
            var id = post.id;
            fs.unlink(`./data/${id}`, function(error){
                response.writeHead(302, {Location: `/`});
                response.end();
            })
        })
    } else{
        response.writeHead(404);
        response.end('not-found')
    }
});

app.listen(3000);