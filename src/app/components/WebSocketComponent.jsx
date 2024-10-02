"use client"; // Bu satır zaten var
import React, { useEffect, useState } from "react";

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [socket, setSocket] = useState(null); // Socket durumunu saklamak için

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080"); // Sunucu adresi
    setSocket(newSocket); // Socket'i state'e kaydet

    newSocket.onopen = () => {
      console.log("WebSocket bağlantısı açıldı.");
    };

    newSocket.onmessage = (event) => {
      console.log("Sunucudan gelen mesaj:", event.data);
      setMessages((prev) => [...prev, event.data]); // Mesajları güncelle
    };

    newSocket.onclose = () => {
      console.log("WebSocket bağlantısı kapatıldı.");
    };

    return () => {
      newSocket.close(); // Bileşen unmount olduğunda bağlantıyı kapat
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputValue) {
      // socket var mı kontrol et
      socket.send(inputValue); // Mesajı sunucuya gönder
      setInputValue("");
    }
  };

  return (
    <div>
      <h1>WebSocket İletişimi</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Mesaj yazın"
      />
      <button onClick={sendMessage}>Gönder</button>
    </div>
  );
};

export default WebSocketComponent;
