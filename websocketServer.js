// websocketServer.js
const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Yeni bir istemci bağlandı.");

  socket.on("message", (message) => {
    console.log("İstemciden gelen mesaj:", message);

    // İstemciye cevap gönder
    socket.send(`Sunucudan cevap: ${message}`);
  });

  socket.on("close", () => {
    console.log("İstemci bağlantısı kapatıldı.");
  });
});

console.log("WebSocket sunucusu başlatıldı, port: 8080");
