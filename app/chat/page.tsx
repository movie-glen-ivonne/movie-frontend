'use client';

import React, { useState, useEffect, useRef } from 'react';
import Conversation from '../components/Conversation';
import Messages from '../components/Messages';
import { useAuth } from '../context/AuthContext';
import apiClient from "@/global/apiClient";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import MessageInput from  "../components/MessageInput";

import { io, Socket } from "socket.io-client";

interface Message {
  id: number;
  createdAt: string;
  roomId: string;
  sendId: string;
  text: string;
  username: string;
}

interface Room {
  id: string;
  name: string;
  latestMessage: Message;
  participants: string[];
}

const Chat = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user, isAuthenticated, loading }: any = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedRoomName, setSelectedRoomName] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();

  // Create a ref to hold the socket client instance
  const socketClientRef = useRef<Socket | null>(null);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const token = localStorage.getItem('token');
    if (token) {
      const searchValue = e.target.value;
      setSearch(searchValue);

      if (searchValue.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        const res = await fetch(`https://movie-project-bk-630243095989.us-central1.run.app/api/search-users/?search=${searchValue}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (res.ok) {
          const details = await res.json();
          if (details.message) {
            setSearchResults([]);
          } else {
            setSearchResults(details);
          }
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error searching users:', error);
        setSearchResults([]);
      }
    }
  };

  const fetchRooms = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await apiClient.get("/rooms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.data) {
          throw new Error("Failed to fetch rooms");
        }
        setRooms(response.data);
        if (response.data.length > 0) {
          setSelectedRoomId(response.data[response.data.length - 1].id);
          setSelectedRoomName(response.data[response.data.length - 1].name);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
  };

  const fetchMessages = async (roomId: string) => {
    try {
      const response = await apiClient.get(`/messages/${roomId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error("Failed to fetch messages");
    }
  };

  const handleUserClick = async (user: any) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await apiClient.post(
        '/rooms',
        { userId: user.id, email: user.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        fetchRooms();
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleJoinRoom = (roomId: string, name: string) => {
    setSelectedRoomName(name);
    setSelectedRoomId(roomId);
    setUserId(user?.id);
    fetchMessages(roomId);

    if (socketClientRef.current) {
      socketClientRef.current.emit("join", { roomId });

      socketClientRef.current.removeAllListeners("message");

      socketClientRef.current.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token || '');
  }, [user]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }

    if (token !== "") {
      fetchRooms();
    }
  }, [isAuthenticated, loading, router, token]);

  useEffect(() => {
    if (token && !socketClientRef.current) {
      socketClientRef.current = io("https://movie-project-bk-630243095989.us-central1.run.app", {
        withCredentials: true,
        extraHeaders: {
          "Authorization": `Bearer ${token}`,
        },
      });
    }
  
    return () => {
      if (socketClientRef.current) {
        socketClientRef.current.disconnect();
      }
    };
  }, [token]);

  return (
    <div className="">
      <div className="flex">
        <div className="w-80 px-4 hidden md:block border-r-[1px] border-selfMessage">
          <div className="overflow-y-auto">
            <div className="text-xl text-gray-600 dark:text-gray-200 p-3">Chat</div>
            <div className="search-chat flex p-3">
              <input
                className="input text-gray-700 dark:text-gray-200 text-sm p-3 focus:outline-none bg-selfMessage dark:bg-selfMessage w-full rounded-l-md"
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search for a user"
              />
              <div className="bg-gray-200 dark:bg-selfMessage flex justify-center items-center pr-3 text-gray-400 rounded-r-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            {searchResults.length !== 0 && (
              <div className="p-3">
                <div className="text-lg text-gray-600 dark:text-gray-200">Search Results</div>
                <ul>
                  {searchResults.map((user: any) => (
                    <li
                      key={user.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-800 rounded"
                      onClick={() => handleUserClick(user)}
                    >
                      {user.name} ({user.email})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-lg text-gray-600 dark:text-gray-200 p-3">Recent</div>
            <Conversation rooms={rooms.slice().reverse()} handleJoinRoom={handleJoinRoom} />
          </div>
        </div>
        {userId && selectedRoomName && messages && (
          <div className="flex-grow p-2 rounded-md">
            <Messages id={userId} room_name={selectedRoomName} messages={messages} />
            <MessageInput roomId={selectedRoomId} socketClient={socketClientRef.current}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;