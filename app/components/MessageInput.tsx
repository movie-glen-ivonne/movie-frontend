import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useMovie } from '../context/MovieContext';
import { Library } from '../types/Library';
import { Socket } from 'socket.io-client'; // Import Socket type

const MessageInput: React.FC<{ roomId: string, socketClient: Socket | null }> = ({ roomId, socketClient }) => {
    const [text, setText] = useState("");
    const [selectedLibraryId, setSelectedLibraryId] = useState<string | null>(null);
    const [selectedLibraryName, setSelectedLibraryName] = useState<string | null>(null);
    const { userLibraries }: any = useMovie();

    const handleSendMessage = () => {
        console.log("socketClient:", socketClient); // Log socketClient to check its state
        if (text && socketClient) {
            socketClient.emit("message", {
                roomId,
                senderId: socketClient.id,
                text,
            });
            setText(""); // Reset input after sending message
        } else if (selectedLibraryId && selectedLibraryName && socketClient) {
            const link = `http://localhost:3000/library/${selectedLibraryId}?library_name=${selectedLibraryName}`;
            setText(link);
            socketClient.emit("message", {
                roomId,
                senderId: socketClient.id,
                text: link,
            });
            // Reset library selection after sending message
            setSelectedLibraryId(null);
            setSelectedLibraryName(null);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        const name = e.target.options[e.target.selectedIndex].text;
        setSelectedLibraryName(name);
        setSelectedLibraryId(id);
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
            <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block ml-2 p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-black-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleChange}
                value={selectedLibraryId || ''}
            >
                <option value="">Choose a library</option>
                {userLibraries.map((library: Library) => (
                    <option key={library.id} value={library.id}>
                        {library.name}
                    </option>
                ))}
            </select>
            <button
                onClick={handleSendMessage}
                className="bg-netflixRed hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded- ml-2 rounded-2xl"
            >
                <IoSend />
            </button>
        </div>
    );
};

export default MessageInput;