import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8080 });

// масив підключених до серверу користувачів
const clients = [];

// connection - івент конекту користувача до серверу. socket - назва параметру, що означає користувача
server.on("connection", (socket) => {
  console.log("Client connected");
  // зберігаємо користувачів в масив clients
  clients.push(socket);

  // оповіщення в чаті, коли до чату під'єднуються нові користувачі: перебираємо масив користувачів + перевірка
  for (const client of clients) {
    if (client === socket) {
      client.send("Welcome to Chat!")
    } else {
      client.send("New user connected")
    }
  }

  // передаємо повідомлення користувача з клієнта на сервер
  // парсимо повідомлення
  socket.onmessage = event => {
    const data = JSON.parse(event.data); // об'єкт з полями name і message

    for (const client of clients) {
      if (client === socket) {
        client.send(`You: ${data.message}`);
      } else {
        client.send( `${data.name}: ${data.message}`);
      }
    }
  }
});


console.log("Server started on port 8080");
