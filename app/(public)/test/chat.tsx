"use client";

import { useEffect, useState } from "react";
import Pusher from "pusher-js";

type Message = {
  username: string;
  message: string;
};
export default function Chat({ username }: { username: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // connect to Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    Pusher.logToConsole = true;
    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data: Message) {
      console.log("data", data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      pusher.unsubscribe("chat");
      pusher.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        username,
        message: input,
      }),
    });
    const data = await res.json();
    console.log(data);

    setInput("");
  };

  useEffect(() => {
    console.log({ messages });
  }, [messages]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Realtime Chat (Pusher)</h1>
      <h1 className="text-xl font-bold mb-4">{`user: ${username}`}</h1>

      <div className="border p-2 h-64 overflow-y-scroll mb-4 bg-gray-50 my-dark-style">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-1">
            <span className="font-bold">{msg.username}: </span>
            {msg.message}
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
