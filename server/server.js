const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const PORT = process.env.PORT || 3003;

var messages = [{
  text: "Pasos",
  author: "Bot"
},
{
  text: "Coloque la bola en su lugar",
  author: "1"
},
{
  text: "Dele el angulo indicado a la maquina",
  author: "2"
},
{
  text: "Oprima \"Soltar esfera!\"",
  author: "3"
}

];

app.use(express.static('public'));


io.on('connection', function(socket) {

  socket.emit('messages', messages);
  //socket.emit('to-graph', data_test);

  socket.on('machine-to-web', function(data) {
    io.sockets.emit('to-graph', data);
  });

  socket.on('machine-to-web-status', function(data) {
      io.sockets.emit('machine-status', data);
  });

  socket.on('new-message', function(data) {
      messages.push(data);
      io.sockets.emit('messages', messages);
  });

  socket.on('web-to-machine-new-angle', function(data){
    console.log("new angle: "+ data.angle);
    io.sockets.emit('machine-angle', data);
  });

  socket.on('web-to-machine-drop-ball', function(data){
    console.log("action: "+ data.action);
    io.sockets.emit('machine-action', data);
  });

});

server.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});