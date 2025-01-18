'use client';

import React, { useState, useEffect } from 'react';
import { Box, Fab, Paper, TextField, IconButton, CircularProgress } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSend = async (e) => {
    if (e) e.stopPropagation();
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
    <Box 
      sx={{ 
        position: 'fixed', 
        bottom: 20, 
        right: 20,
        pointerEvents: 'auto',
        zIndex: 1000
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            bottom: 70,
            right: 0,
            width: 600, // 너비 증가
            height: 400, // 높이 증가
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            backgroundColor: 'white',
            pointerEvents: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 제목 추가 */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2,
              borderBottom: '1px solid #eee',
              pb: 1
            }}
          >
            <Box 
              sx={{ 
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#333',
                flex: 1,
                textAlign: 'center'
              }}
            >
              Ask Anything About Me
            </Box>
            <IconButton onClick={handleToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box 
  sx={{ 
    flexGrow: 1, 
    overflow: 'auto', 
    mb: 2,
    pointerEvents: 'auto'
  }}
>
  {messages.map((msg, index) => (
    <Box
      key={index}
      sx={{
        mb: 2,  // 메시지 간격 증가
        textAlign: msg.role === 'user' ? 'right' : 'left',
      }}
    >
      {/* 레이블 추가 */}
      <Box
        sx={{
          mb: 0.5,
          fontSize: '0.85rem',
          color: 'grey.600',
          fontWeight: 500,
          px: 1,
        }}
      >
        {msg.role === 'user' ? 'Me:' : 'AI Bot:'}
      </Box>
      
      <Paper
        sx={{
          p: 1.5,  // 패딩 약간 증가
          display: 'inline-block',
          bgcolor: msg.role === 'user' ? '#f5f5f5' : '#eeeeee',
          maxWidth: '80%',
          wordBreak: 'break-word',
          borderRadius: '12px',  // 모서리를 더 둥글게
          px: 2,  // 좌우 패딩 증가
        }}
      >
        {msg.content}
      </Paper>
    </Box>
  ))}
</Box>

          <Box 
            sx={{ 
              display: 'flex', 
              gap: 1,
              pointerEvents: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => {
                e.stopPropagation();
                setInput(e.target.value);
              }}
              onKeyPress={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') handleSend(e);
              }}
              disabled={isLoading}
              placeholder="Ask anything about Dennis"
              variant="outlined"
              sx={{ 
                backgroundColor: 'white',
                pointerEvents: 'auto',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey.300',
                  },
                  '&:hover fieldset': {
                    borderColor: 'grey.500',
                  },
                },
              }}
              onClick={(e) => e.stopPropagation()}
            />
            <IconButton 
              onClick={handleSend}
              disabled={isLoading}
              sx={{ 
                pointerEvents: 'auto',
                color: 'grey.700', // 아이콘 색상을 회색으로 변경
                '&:hover': {
                  backgroundColor: 'grey.100',
                }
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </Box>
        </Paper>
      )}

      <Fab 
        sx={{ 
          bgcolor: 'grey.500', // Fab 버튼 색상을 회색으로 변경
          '&:hover': {
            bgcolor: 'grey.600',
          },
          pointerEvents: 'auto'
        }}
        onClick={handleToggle}
      >
        <ChatIcon />
      </Fab>
    </Box>
  );
};

export default ChatBot;