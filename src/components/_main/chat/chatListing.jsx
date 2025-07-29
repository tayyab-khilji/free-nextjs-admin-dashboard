'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    TextField,
    IconButton,
    Typography,
    Paper,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ChatScreen() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! How can I assist you today?' },
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: 'This is a sample AI response. How else can I help?' },
            ]);
        }, 500);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden', // Prevent any scrolling on the main container
                backgroundColor: '#f5f5f5',
            }}
        >
            {/* Header */}
            <Box sx={{
                p: 2,
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                flexShrink: 0 // Prevent header from shrinking
            }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    AI Chatbot
                </Typography>
            </Box>

            {/* Scrollable message area - properly constrained */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    px: { xs: 1, sm: 2, md: 4 },
                    py: 2,
                    width: '100%',
                    boxSizing: 'border-box', // Ensure padding doesn't cause overflow
                }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            mb: 2,
                            width: '100%',
                            boxSizing: 'border-box',
                            px: { xs: 1, sm: 2 } // Add horizontal padding
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                maxWidth: { xs: '90%', sm: '80%', md: '70%' },
                                backgroundColor: msg.sender === 'user' ? '#dedefb' : '#e0e0e0',
                                color: msg.sender === 'user' ? '#000000' : '#000',
                                borderRadius: msg.sender === 'user'
                                    ? '18px 18px 0 18px'
                                    : '18px 18px 18px 0',
                                wordBreak: 'break-word', // Prevent long words from causing overflow
                            }}
                        >
                            <Typography variant="body1">{msg.text}</Typography>
                        </Paper>
                    </Box>
                ))}
                <div ref={bottomRef} />
            </Box>

            {/* Input area - properly constrained */}
            <Box
                sx={{
                    p: 2,
                    borderTop: '1px solid #e0e0e0',
                    backgroundColor: '#fff',
                    width: '100%',
                    flexShrink: 0, // Prevent input area from shrinking
                    boxSizing: 'border-box',
                }}
            >
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    width: '100%',
                    maxWidth: 'md',
                    margin: '0 auto',
                    alignItems: 'center',
                }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '24px',
                                backgroundColor: '#f5f5f5',
                            },
                            flex: 1,
                        }}
                    />
                    <IconButton
                        color="primary"
                        onClick={handleSend}
                        sx={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                            flexShrink: 0,
                            width: '48px',
                            height: '48px'
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}