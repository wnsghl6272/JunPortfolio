'use client';

import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, IconButton, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
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
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
            }}
          >
            <Box
              sx={{
                mb: 0.5,
                fontSize: '0.85rem',
                color: 'grey.600',
                textAlign: msg.role === 'user' ? 'right' : 'left',
              }}
            >
              {msg.role === 'user' ? 'You' : 'Dennis'}
            </Box>
            <Paper
              sx={{
                p: 2,
                bgcolor: msg.role === 'user' ? '#1976d2' : '#f5f5f5',
                color: msg.role === 'user' ? 'white' : 'black',
                borderRadius: '1rem',
              }}
            >
              {msg.content}
            </Paper>
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
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
            placeholder="Ask anything about Dennis..."
            variant="outlined"
          />
          <IconButton 
            onClick={handleSend}
            disabled={isLoading}
            color="primary"
          >
            {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatBot;