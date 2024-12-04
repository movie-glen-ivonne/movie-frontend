import React from 'react';
import Image from 'next/image';

interface ConversationItemProps {
    active: boolean;
    time: string;
    name: string;
    message: string;
    id: string;
    handleJoinRoom: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ active, time, name, message, id, handleJoinRoom }) => {
    const _class = active ? 'bg-selfMessage hover:bg-selfMessage' : 'bg-transparent hover:bg-black'; // Apply active background

    return (
        <div onClick={handleJoinRoom} key={id} className={'rounded-2xl ' + _class}>
            <div className={'conversation-item p-1 m-1 rounded-md ' + _class}>
                <div className={'flex items-center p-2 cursor-pointer'}>
                    <div className="w-7 h-7 m-1">
                         <Image
                            src={`https://ui-avatars.com/api/?name=${name.toUpperCase()}&background=random`}
                            alt={name ? name : "test"}
                            width={45}
                            height={45}
                            className="rounded-full"
                        />
                    </div>
                    <div className="flex-grow p-2">
                        <div className="flex justify-between text-md ">
                            <div className="text-sm text-gray-700 dark:text-gray-200">{name}</div>
                            <div className="text-xs text-gray-400 dark:text-gray-300">{time}</div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400  w-40 truncate">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationItem;