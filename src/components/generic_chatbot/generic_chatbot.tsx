'use client';

import { useChat } from 'ai/react';

export default function GenericChatbot() {
  const { messages, input, setInput, append } = useChat();
    console.log(messages)
  return (
    <div>
      <input
        value={input}
        onChange={event => {
          setInput(event.target.value);
        }}
        onKeyDown={async event => {
          if (event.key === 'Enter') {
            append({ content: input, role: 'user' });
          }
        }}
      />

      {messages.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
    </div>
  );
}