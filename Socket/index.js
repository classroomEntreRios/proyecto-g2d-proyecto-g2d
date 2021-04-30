const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: true,
        credentials: true,
        methods:["GET", "POST"]
    }
});

io.on('connection',(socket)=> {
    console.log('Nuevo usuario conectado');

    socket.io("sendMessage", (messageInfo) => {
        console.log("Enviando un mensaje");
        socket.broadcast.emit ("receiveMessage", messageInfo);
    })
});

app.get ('/',(req,res)=> {
    res.send('<h1> Hola chat</h1>')
});

http.listen(3000,()=> {
    console.log("Escuchando en puerto 3000");
})