'use client';

import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import ChatIcon from '@mui/icons-material/Chat';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! 👋 Happy to have a conversation with you! Ask me anything' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);

  useEffect(() => {
    const createThread = async () => {
      try {
        const response = await fetch('/api/create-thread', {
          method: 'POST',
        });
        const data = await response.json();
        setThreadId(data.threadId);
      } catch (error) {
        console.error('Error creating thread:', error);
      }
    };

    createThread();
  }, []);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || !threadId) return;

    setIsLoading(true);
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          threadId,
          message: input,
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: 'grey.100',
          borderBottom: '1px solid',
          borderColor: 'grey.300',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <ChatIcon sx={{ color: 'grey.700' }} />
          <Box>
            <Box sx={{ 
              typography: 'h6', 
              fontWeight: 'bold',
              color: 'grey.800'
            }}>
              Chat with Dennis
            </Box>
            <Box sx={{ 
              typography: 'body2',
              color: 'grey.600'
            }}>
              Ask anything about me
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Chat Messages */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                typography: 'caption',
                color: 'grey.600',
                textAlign: msg.role === 'user' ? 'right' : 'left',
              }}
            >
              {msg.role === 'user' ? 'You' : 'Dennis'}
            </Box>
            <Paper
              sx={{
                p: 2,
                bgcolor: msg.role === 'user' ? '#1976d2' : 'grey.100',
                color: msg.role === 'user' ? 'white' : 'black',
                borderRadius: '1rem',
                maxWidth: '80%',
              }}
            >
              {msg.content}
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Input Area */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSend(e);
            }}
            disabled={isLoading}
            placeholder="Type your message..."
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '1.5rem',
              }
            }}
          />
          <IconButton 
            onClick={handleSend}
            disabled={isLoading}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&.Mui-disabled': {
                bgcolor: 'grey.300',
                color: 'grey.500',
              }
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBot;