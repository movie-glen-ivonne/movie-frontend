'use client';

import React, { useState } from 'react';
import ConversationItem from './ConversationItem';

interface Room {
    id: string;
    name: string;
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
                    message="test"
                    time="1 hour ago"
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