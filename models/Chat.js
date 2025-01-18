import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: ['user', 'assistant']
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSchema = new mongoose.Schema({
  threadId: {
    type: String,
    required: true,
    unique: true
  },
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Chat || mongoose.model('Chat', chatSchema);