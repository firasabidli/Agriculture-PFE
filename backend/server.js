const http = require('http');
const app = require("./app");
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// Gérer les connexions WebSocket
io.on('connection', (socket) => {
  console.log('New client connected');

  // Gérer la connexion d'un utilisateur
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });
  socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
    console.log("Message received - senderId:", senderId, "receiverId:", receiverId, "text:", text);
    
    // Vérifier si le receiverId est défini
    if (receiverId) {
      console.log("ReceiverId:", receiverId);
      
      // Envoyer le message au destinataire
      io.to(receiverId).emit('getMessage', {
        senderId,
        text,
      });
    } else {
      console.log("ReceiverId not provided.");
    }
  });
  
  // Gérer les messages de chat
// socket.on('sendMessage', async ({ senderId, receiverId, text }) => {
//   console.log("Message received - senderId:", senderId, "receiverId:", receiverId, "text:", text);
//   const receiver = getUser(receiverId);
//   console.log("Message receiver", receiver);
//   // if (receiver) {
//     io.to(receiver.socketId).emit('getMessage', {
//       senderId,
//       text,
//     });
//   // } else {
//   //   console.log('user:', senderId);
//   //   console.log('Receiver not found:', receiverId);
//   // }
// });

  // Gérer la déconnexion d'un utilisateur
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
module.exports = app;


app.set('port',3001);

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});

// server.listen(3001);