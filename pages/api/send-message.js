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
    // MongoDB 연결 시도
    console.log('Connecting to MongoDB...');
    await dbConnect();
    console.log('MongoDB connected successfully');

    const { threadId, message } = req.body;
    console.log('Received request:', { threadId, message });

    // 사용자 메시지 저장
    let chat = await Chat.findOne({ threadId });
    if (!chat) {
      console.log('Creating new chat thread');
      chat = new Chat({ threadId, messages: [] });
    }
    
    chat.messages.push({
      role: 'user',
      content: message
    });

    // OpenAI API 호출
    console.log('Calling OpenAI API...');
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: message,
    });

    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    console.log('Initial run status:', runStatus.status);
    
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      console.log('Updated run status:', runStatus.status);
      
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
    console.log('Saving to MongoDB...');
    await chat.save();
    console.log('Saved successfully');

    res.status(200).json({ message: lastMessage.content[0].text.value });
  } catch (error) {
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    
    // 더 구체적인 에러 메시지 반환
    res.status(500).json({ 
      message: 'Something went wrong',
      error: {
        type: error.name,
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
}