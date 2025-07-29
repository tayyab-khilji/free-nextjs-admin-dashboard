'use client';
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import NextLink from 'next/link';

export default function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      p: 3
    }}>
      {/* 404 Illustration */}
      <Box sx={{
        width: '100%',
        maxWidth: '500px',
        mb: 4,
        '& img': {
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}>
        <img
          src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/media/ad42057889c385dd8f84b8330f69269b.gif"
          alt="404 illustration"
        />
      </Box>

      <Typography variant="h3" gutterBottom sx={{
        fontWeight: 'bold',
        color: 'text.primary',
        mb: 2
      }}>
        404 - Page Not Found
      </Typography>

      <Typography variant="body1" sx={{
        mb: 4,
        color: 'text.secondary',
        maxWidth: '500px'
      }}>
        The page you're looking for doesn't exist or may have been moved.
      </Typography>

      <NextLink href="/dashboard" passHref>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '12px',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: 'none',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 'none',
              transition: 'transform 0.2s'
            }
          }}
        >
          Go Back Home
        </Button>
      </NextLink>

      {/* Decorative gradient */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(180deg, transparent, rgba(245, 247, 250, 1))',
        zIndex: -1
      }} />
    </Container>
  );
}