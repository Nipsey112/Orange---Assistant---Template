// pages/index.tsx

import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hey! I am The Orange Assistant. Ask me anything about Sign Protocol, @ethsign, or the Orange Dynasty.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong. Try again.' },
      ]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <>
      <Head>
        <title>The Orange Assistant</title>
      </Head>
      <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          🍊 The Orange Assistant
        </h1>
        <p className="text-center text-orange-800 mb-6">
          Ask me anything about Sign Protocol, @ethsign, or the Orange Dynasty.
        </p>

        <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4">
          <div className="h-80 overflow-y-scroll space-y-2 border-b pb-4 mb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={
                  msg.role === 'user'
                    ? 'text-right text-orange-700'
                    : 'text-left text-black'
                }
              >
                <p>
                  <strong>
                    {msg.role === 'user' ? 'You' : 'Orange Assistant'}:
                  </strong>{' '}
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Ask a question..."
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
