import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const thread = await openai.beta.threads.create();
    res.status(200).json({ threadId: thread.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}