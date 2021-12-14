const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server} = require('socket.io');
const PORT = process.env.PORT || 3000;
const io = new Server(server);

app.get('/', (req, res, next) => {

    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

    console.log("user connected");
    socket.on('on-chat', data => {

        console.log(data);
        io.emit('user-chat', data);
    })
})
server.listen(PORT, () => {

    console.log(`server is running on port ${PORT}`);
})