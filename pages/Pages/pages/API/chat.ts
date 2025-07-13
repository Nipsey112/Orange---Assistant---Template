// pages/api/chat.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Load from .env file or Replit Secrets
});

const systemMessage = {
  role: 'system',
  content: `You are The Orange Assistant — an AI trained only to talk about Sign Protocol, @ethsign, Sign Super App, and the Orange Dynasty community. 
Do not answer unrelated questions. If asked something off-topic, reply with: 
"I'm only trained to answer questions related to Sign Protocol and the Orange Dynasty."`,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [systemMessage, ...messages],
      temperature: 0.5,
    });

    const reply = response.choices[0].message?.content || 'No response generated.';
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return res.status(500).json({ reply: 'Oops! Something went wrong. Try again.' });
  }
      }
