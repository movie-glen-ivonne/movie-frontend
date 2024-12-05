import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import Image from 'next/image';

const isValidUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch (error) {
      return false;
    }
  };

const Messages: React.FC<{ id: string, room_name: string, messages: any }> = ({ id, room_name, messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const renderMessageText = (text: string) => {
    // console.log(text);
    if (isValidUrl(text)) {
      const url = new URL(text);
      console.log(url);
      const pathParts = url.search.split('=');
      const libraryName = pathParts[pathParts.length - 1];
      return (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {libraryName}
        </a>
      );
    }
    return <div className="text-gray-700 dark:text-gray-200">{text}</div>;
  };

  const myLoader = ({ src }: any) => {
    return `https://ui-avatars.com/api/?name=${src}&background=random`;
  };


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-grow flex flex-col px-6">
      <div className="w-full p-1 shadow-md rounded-xl rounded-bl-none rounded-br-none">
        <div className="flex p-2 align-middle items-center">
          <div className="p-2 md:hidden rounded-full mr-1 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <div className="border rounded-full border-black p-1/2">
            <Image
              loader={myLoader}
              src={room_name.toUpperCase()}
              alt={room_name ? room_name : "test"}
              width={55}
              height={55}
              className="rounded-full"
            />
          </div>
          <div className="flex-grow p-2">
            <div className="text-md text-gray-50">{room_name}</div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <div className="text-xs text-gray-50 ml-1">Online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Section */}
      <div className="w-full p-3 overflow-y-auto h-[600px]">
        {messages.map((message: any) => (
          <div
            className={`flex items-end w-full ${message.senderId == id ? 'justify-end' : 'justify-start'}`}
            key={message.id}
          >
            {message.senderId == id ? (
              <div className="w-8 m-3 rounded-full" />
            ) : (
              <Image
                loader={myLoader}
                src={room_name.toUpperCase()}
                alt={message.username ? message.username : "test"}
                width={45}
                height={45}
                className="rounded-full"
              />
            )}
            <div
              className={`w-full flex flex-col p-2 ${message.senderId == id ? 'items-end' : 'items-start'
                }`}
            >
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-200 mb-1">
                <span className="font-medium">{message.username}</span>
                <span className="ml-2 text-gray-400">
                  {moment(message.createdAt).format('DD MMM YYYY, h:mm A')}
                </span>
              </div>
              <div
                className={`py-3 px-4 ${message.senderId == id
                    ? ' dark:bg-selfMessage rounded-2xl sm:w-3/4 md:w-3/6'
                    : 'dark:bg-otherMessage rounded-2xl sm:w-3/4 md:w-3/6'
                  }`}
              >
                <div className="text-gray-700 dark:text-gray-200"> {renderMessageText(message.text)}</div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Messages;