// const express = require("express")
const path = require("path");
const fs = require("fs")
const http = require("http");
// const app = express();


// app.use(express.static(path.join(__dirname,'/Build')));
// app.use(express.static(path.join(__dirname,'/TemplateData')));

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'index.html'));
// })

// const server = app.listen(8080,()=>{
//     console.log('App running');
// })

function inRange(rt,max){
    if(rt>=max){
        rt = rt - max;
        inRange(rt,max);
    }
    return rt;
}


http.createServer(function (request, response) {
    console.log('request starting for ',request.url);
    
    var filePath = '.' + request.url;
    if (filePath == './')
    filePath = './index.html';
    if(JSON.stringify(request.url).slice(1, 12) == "/allAudios:"){
        files = fs.readdirSync(path.join(__dirname,"/audio"));
        temp = JSON.stringify(request.url)
        temp = temp.slice(12,temp.length -1);
        // console.log(temp);
        laps = Math.floor(Math.random()*10);
        returnStr="";
        max=null;
        for(let i=0; i< Number(temp); i++){
            max = laps + i;
            if(max >= files.length){max = max - files.length}
            returnStr = returnStr + files[max];
            returnStr = returnStr+":";
        }
        returnStr = returnStr.slice(0,returnStr.length -1);
        response.end(returnStr);
        return;
    }
    
    if(JSON.stringify(request.url).slice(1,15 ) == "/fetchTexture:"){
        files = fs.readdirSync(path.join(__dirname,"/textures"));
        temp = JSON.stringify(request.url);
        temp = temp.slice(15,temp.length -1)   
        laps = Math.floor(Math.random()*10);
        returnStr = "";      
        for(let i=0; i< Number(temp); i++){
            max = laps + i;
            if(max >= files.length){max = max - files.length}
            returnStr = returnStr + files[max];
            returnStr = returnStr+":";
        }
        returnStr = returnStr.slice(0,returnStr.length -1);
        response.end(returnStr);
        return;
    }

    if( JSON.stringify(request.url).slice(1,10) == "/energyof" ){
        temp = JSON.stringify(request.url);
        searchString = temp.slice(11,temp.length-1)
        fs.readFile("./audioEnergy/musicData.json","utf8",(err,jsonString)=>{
            if(err){
                console.log("error in audio Energy");
                response.end("2.5");
            }else{
                jsonString = JSON.parse(jsonString);
                // console.log(jsonString[searchString])
                response.end( JSON.stringify(jsonString[searchString] ));
            }
        })
        return;
    }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.wasm':
            contentType = 'application/wasm';
            break;
        case '.gz':
            contentType = 'application/javascript';            
            if(filePath.slice(filePath.length-8,filePath.length-3) == ".wasm"){
                contentType = 'application/wasm';            
            }
            break;
        case '.br':
            contentType = 'application/javascript';            
            if(filePath.slice(filePath.length-8,filePath.length-3) == ".wasm"){
                contentType = 'application/wasm';            
            }
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if(extname == '.gz'){
            response.setHeader('Content-Encoding',"gzip");
        }
        if(extname == '.br'){
            response.setHeader('Content-Encoding',"br");
        }
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');