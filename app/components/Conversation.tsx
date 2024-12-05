'use client';

import React, { useState } from 'react';
import ConversationItem from './ConversationItem';
import moment from 'moment';

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

interface ConversationProps {
    rooms: Room[];
    handleJoinRoom: (roomId: string, name: string) => void;
}

const Conversation: React.FC<ConversationProps> = ({ rooms, handleJoinRoom }) => {
    const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

    const handleRoomClick = (roomId: string, name: string) => {
        console.log(name);
        setActiveRoomId(roomId === activeRoomId ? null : roomId);
        handleJoinRoom(roomId, name);
    };

    return (
        <div className="p-1  overflow-y-auto h-[500px]">
            {rooms.map((item) => (
                <ConversationItem
                key={item.id}
                    message={item.latestMessage ? item.latestMessage.text : ""}
                    time={
                        item.latestMessage
                          ? moment(item.latestMessage.createdAt).isSame(new Date(), 'day')
                            ? moment(item.latestMessage.createdAt).format('h:mm A')
                            : moment(item.latestMessage.createdAt).format('MMM D')
                          : ""
                    }
                    name={item.name}
                    active={item.id === activeRoomId}
                    id={item.id}
                    handleJoinRoom={() => handleRoomClick(item.id, item.name)}
                />
            ))}
        </div>
    );
};

export default Conversation;