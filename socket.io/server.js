import http from "node:http";
import { Server } from "socket.io";

// створюємо сервер
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// повідомляємо користувачам, що до чату доєднався новий користувач
io.on("connection", (socket) => {
  console.log('New client connect');

  // emit створює повідомлення для нового користувача на клієнті. додаємо назву кастомного івенту, наступним аргументом - повідомлення, яке треба відправити
  socket.emit("chatMessage", "Welcome to the chat");
  // щоб повідомити інших користувачів про нового користувача
  socket.broadcast.emit("chatMessage", "New user connected to the chat");
})

server.listen(8080, () => {
  console.log("Server started on port 8080");
})