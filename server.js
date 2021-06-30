const express = require('express');
const path = require("path");
const app = express();
const http = require("http");
const port = process.env.PORT || 3000;
const server = http.createServer(app); 

const staticpath = path.join(__dirname,"public");
app.use(express.static(staticpath));

app.get('/', (req, res)=> {
  res.sendFile(__dirname + '/index.html');
});
 
//socket
const io = require('socket.io')(server)
io.on('connection' , (socket)=>{
    console.log("socket connection successful...");
    socket.on("message" , (msg)=>{
      socket.broadcast.emit("message" , msg);
      
    })
})

server.listen(port,()=>{
    console.log("listening port...");
});
