'use client';
import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function PrivacyPolicyPage() {

  return (
    <Container maxWidth="md" sx={{ py: 4 }} >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          AI Chatbot Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          1. Introduction
        </Typography>
        <Typography paragraph>
          This Privacy Policy governs your use of our AI chatbot service. It explains how we handle your information when you interact with our chatbot.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          2. Information We Collect
        </Typography>
        <Typography paragraph>
          Our chatbot may collect the following information:
        </Typography>
        <ul>
          <li>
            <Typography paragraph>
              <strong>Conversation Data:</strong> All messages exchanged with the chatbot are stored to improve service quality.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Usage Metrics:</strong> We collect interaction patterns, frequency, and duration of sessions.
            </Typography>
          </li>
          <li>
            <Typography paragraph>
              <strong>Technical Information:</strong> IP address, browser type, device information, and operating system.
            </Typography>
          </li>
        </ul>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          3. How We Use Your Information
        </Typography>
        <ul>
          <li><Typography>Provide and maintain chatbot services</Typography></li>
          <li><Typography>Improve AI response quality and accuracy</Typography></li>
          <li><Typography>Develop new features and functionality</Typography></li>
          <li><Typography>Monitor service performance and security</Typography></li>
          <li><Typography>Comply with legal obligations</Typography></li>
        </ul>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          4. Data Processing and AI Training
        </Typography>
        <Typography paragraph>
          Your interactions may be used to train our AI models. All data is anonymized and aggregated before being used for training purposes.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          5. Data Retention
        </Typography>
        <Typography paragraph>
          We retain conversation data for 30 days unless required longer for legal or security purposes. Anonymized data may be kept indefinitely for model improvement.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          6. Your Rights
        </Typography>
        <Typography paragraph>
          You have the right to:
        </Typography>
        <ul>
          <li><Typography>Access your personal data</Typography></li>
          <li><Typography>Request correction or deletion</Typography></li>
          <li><Typography>Object to processing</Typography></li>
          <li><Typography>Request data portability</Typography></li>
          <li><Typography>Withdraw consent</Typography></li>
        </ul>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          7. Security Measures
        </Typography>
        <Typography paragraph>
          We implement industry-standard security protocols including encryption, access controls, and regular security audits.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          8. Third-Party Services
        </Typography>
        <Typography paragraph>
          We may use third-party services for hosting, analytics, or AI model processing. All vendors are vetted for compliance with data protection standards.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          9. Policy Updates
        </Typography>
        <Typography paragraph>
          We may update this policy periodically. Continued use of the chatbot after changes constitutes acceptance of the new terms.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          10. Contact Information
        </Typography>
        <Typography paragraph>
          For privacy-related inquiries:
        </Typography>
        <Typography paragraph>
          Email: privacy@test.com<br />
          Postal Address: Test Address
        </Typography>
      </Box>
    </Container >
  );
}