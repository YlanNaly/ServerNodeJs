let http = require('http');
let fs = require('fs') ;
let url = require('url');

let server = http.createServer()
let query ;
let name;
server.on('request',(request,response) => {

    fs.readFile('./client/index.html' , 'utf-8' , (err,data) =>{
        if(err) {
            response.writeHead(404);
            response.end('fichier introuvable')
        }
        
        else{
        response.writeHead(200, {
            'Content-type' : 'text/html ; charset = utf-8'
        });

         query = url.parse(request.url , true).query
         name = query.name === undefined ? 'ok' : query.name;
    }
    data = data.replace('{{name}}' , name)
    response.end(data)
    })
})

server.listen(8080)
