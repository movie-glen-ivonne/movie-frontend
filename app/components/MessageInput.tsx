import socketClient from "@/global/socketClient";
import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

const MessageInput: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [text, setText] = useState("");

  const handleSendMessage = () => {
    if (text) {
      socketClient.emit("message", {
        roomId,
        senderId: socketClient.id,
        text,
      });
      setText("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="py-4 px-6 flex rounded-2xl">
      <input
        type="text"
        className="flex-1 py-2 px-4 rounded-2xl bg-selfMessage text-white"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSendMessage}
        className="bg-netflixRed hover:bg-blue-500 text-white font-bold py-2 px-4 rounded- ml-2 rounded-2xl"
      >
        <IoSend />
      </button>
    </div>
  );
};

export default MessageInput;