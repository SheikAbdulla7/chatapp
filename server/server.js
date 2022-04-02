const http = require('http');
const server = http.createServer();

const socketio = require('socket.io');
//const io = socketio.listen(server);
const io = socketio(server, {
    cors : {
        origin : 'http://127.0.0.1:8000',
        //origin : 'http://192.168.43.223:8000/',   //http://192.168.43.223:8000
        methods : ["GET", "POST"]
    }
});

//const room="testroom";

    io.on('connection', socket=>{
        socket.sendBuffer = [];
        console.log("connected");
        //socket.broadcast.to(roomID).emit('status', 'online');
        console.log(socket.id);
        let roomID;
        socket.on('connection_details', (data)=>{
            //socket.id = data.my_id;
            roomID = data.room_id;
            console.log("new id is " + socket.id);
            console.log(roomID);
            socket.join(roomID);
            //io.in(roomID).emit('message', 'new hello world!!');
        })
        socket.on('send_message', msg => {
            //socket.join(roomID);
            console.log(msg);
            //console.log(io.sockets.adapter.rooms);
            socket.broadcast.to(roomID).emit('display_message', msg);
            //socket.broadcast.to(roomID).emit('', msg);
        });
        socket.on('base64_file', (msg)=>{
              console.log("received base64 file from server: " + msg.fileName);
              console.log(msg)
             socket.broadcast.to(roomID).emit('base64 image',  msg.image);
                // {
                //   file: msg.file,
                //   'fileName': msg.fileName,
                // }
        })
         socket.on('disconnect', socket => {
            //socket.broadcast.to(roomID).emit('status', 'offline');
            console.log("socket disconnected");
         })
        //  socket.join(room);
        //  io.to(room).emit('message', 'hello world!!');*/
    })


server.listen(3000, ()=> console.log("listen on the port 3000"))

