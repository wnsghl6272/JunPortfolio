import OpenAI from 'openai';
import dbConnect from '../../lib/mongodb';
import Chat from '../../models/Chat';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.ASSISTANT_ID;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const { threadId, message } = req.body;

    // 사용자 메시지 저장
    let chat = await Chat.findOne({ threadId });
    if (!chat) {
      chat = new Chat({ threadId, messages: [] });
    }
    
    // 사용자 메시지 추가
    chat.messages.push({
      role: 'user',
      content: message
    });

    // OpenAI API 호출
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      
      if (runStatus.status === 'failed') {
        throw new Error('Run failed');
      }
    }

    const messages = await openai.beta.threads.messages.list(threadId);
    const lastMessage = messages.data[0];
    
    // AI 응답 저장
    chat.messages.push({
      role: 'assistant',
      content: lastMessage.content[0].text.value
    });
    
    // MongoDB에 저장
    await chat.save();

    res.status(200).json({ message: lastMessage.content[0].text.value });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}