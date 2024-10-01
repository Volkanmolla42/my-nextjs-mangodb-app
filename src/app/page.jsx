"use client";
// app/page.jsx
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    } else {
      console.error("Error fetching users:", response.statusText);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (response.ok) {
      fetchUsers();
      setName("");
      setEmail("");
    } else {
      console.error("Error:", await response.json());
    }
  };

  return (
    <div>
      <h1>Kullanıcı Formu</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="İsim"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Gönder</button>
      </form>

      <h2>Kayıtlı Kullanıcılar</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
