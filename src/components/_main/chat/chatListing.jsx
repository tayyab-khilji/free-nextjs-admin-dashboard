'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

export default function ChatScreen() {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Prevent multiple initialization
    if (window.N8nChatWidgetLoaded || isWidgetLoaded) return;

    // Set the widget configuration
    window.ChatWidgetConfig = {
      webhook: {
        url: 'https://maheliacruz.app.n8n.cloud/webhook/dc7dea13-4ea5-46fa-b243-60fa3579c8c8/chat',
        route: 'general'
      },
      branding: {
        logo: 'https://i.postimg.cc/Bnc9WmX3/cloudbotics.png',
        name: 'Cloud Botics Consultancy',
        welcomeText: 'Get instant answers to your questions!',
        responseTimeText: 'Welcome to the Admin Chat Interface'
      },
      style: {
        primaryColor: '#3399FF',
        secondaryColor: '#1e40af',
        position: 'right',
        backgroundColor: '#ffffff',
        fontColor: '#1f2937'
      },
      suggestedQuestions: ['Where have i listed my products?']
    };

    // Initialize widget
    initializeChatWidget();
    setIsWidgetLoaded(true);
  }, [isWidgetLoaded]);

  const initializeChatWidget = () => {
    // Mark as loaded to prevent multiple initialization
    window.N8nChatWidgetLoaded = true;

    // Load Poppins font
    const fontElement = document.createElement('link');
    fontElement.rel = 'stylesheet';
    fontElement.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontElement);

    // Apply widget styles adapted for admin panel
    const widgetStyles = document.createElement('style');
    widgetStyles.textContent = `
            .admin-chat-widget {
                --chat-color-primary: #3399FF;
                --chat-color-secondary: #1e40af;
                --chat-color-tertiary: #1565c0;
                --chat-color-light: #e3f2fd;
                --chat-color-surface: #ffffff;
                --chat-color-text: #1f2937;
                --chat-color-text-light: #6b7280;
                --chat-color-border: #e5e7eb;
                --chat-shadow-sm: 0 1px 3px rgba(51, 153, 255, 0.1);
                --chat-shadow-md: 0 4px 6px rgba(51, 153, 255, 0.15);
                --chat-shadow-lg: 0 10px 15px rgba(51, 153, 255, 0.2);
                --chat-radius-sm: 8px;
                --chat-radius-md: 12px;
                --chat-radius-lg: 20px;
                --chat-radius-full: 9999px;
                --chat-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                font-family: 'Poppins', sans-serif;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
            }

            .admin-chat-widget .chat-window {
                width: 100%;
                height: 100%;
                background: var(--chat-color-surface);
                border-radius: var(--chat-radius-lg);
                box-shadow: var(--chat-shadow-md);
                border: 1px solid var(--chat-color-light);
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }

            .admin-chat-widget .chat-header {
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
                color: white;
                border-radius: var(--chat-radius-lg) var(--chat-radius-lg) 0 0;
            }

            .admin-chat-widget .chat-header-logo {
                width: 40px;
                height: 40px;
                border-radius: var(--chat-radius-sm);
                object-fit: contain;
                background: white;
                padding: 6px;
            }

            .admin-chat-widget .chat-header-title {
                font-size: 18px;
                font-weight: 600;
                color: white;
            }

            .admin-chat-widget .chat-body {
                display: flex;
                flex-direction: column;
                height: 100%;
                flex: 1;
            }

            .admin-chat-widget .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                background: #f9fafb;
                display: flex;
                flex-direction: column;
                gap: 12px;
                min-height: 400px;
            }

            .admin-chat-widget .chat-messages::-webkit-scrollbar {
                width: 6px;
            }

            .admin-chat-widget .chat-messages::-webkit-scrollbar-track {
                background: transparent;
            }

            .admin-chat-widget .chat-messages::-webkit-scrollbar-thumb {
                background-color: rgba(51, 153, 255, 0.3);
                border-radius: var(--chat-radius-full);
            }

            .admin-chat-widget .chat-bubble {
                padding: 14px 18px;
                border-radius: var(--chat-radius-md);
                max-width: 85%;
                word-wrap: break-word;
                font-size: 14px;
                line-height: 1.6;
                position: relative;
                white-space: pre-line;
            }

            .admin-chat-widget .chat-bubble.user-bubble {
                background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 4px;
                box-shadow: var(--chat-shadow-sm);
            }

            .admin-chat-widget .chat-bubble.bot-bubble {
                background: white;
                color: var(--chat-color-text);
                align-self: flex-start;
                border-bottom-left-radius: 4px;
                box-shadow: var(--chat-shadow-sm);
                border: 1px solid var(--chat-color-light);
            }

            .admin-chat-widget .typing-indicator {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 14px 18px;
                background: white;
                border-radius: var(--chat-radius-md);
                border-bottom-left-radius: 4px;
                max-width: 80px;
                align-self: flex-start;
                box-shadow: var(--chat-shadow-sm);
                border: 1px solid var(--chat-color-light);
            }

            .admin-chat-widget .typing-dot {
                width: 8px;
                height: 8px;
                background: var(--chat-color-primary);
                border-radius: var(--chat-radius-full);
                opacity: 0.7;
                animation: typingAnimation 1.4s infinite ease-in-out;
            }

            .admin-chat-widget .typing-dot:nth-child(1) {
                animation-delay: 0s;
            }

            .admin-chat-widget .typing-dot:nth-child(2) {
                animation-delay: 0.2s;
            }

            .admin-chat-widget .typing-dot:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typingAnimation {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-4px);
                }
            }

            .admin-chat-widget .chat-controls {
                padding: 16px;
                background: var(--chat-color-surface);
                border-top: 1px solid var(--chat-color-light);
                display: flex;
                gap: 10px;
            }

            .admin-chat-widget .chat-textarea {
                flex: 1;
                padding: 14px 16px;
                border: 1px solid var(--chat-color-light);
                border-radius: var(--chat-radius-md);
                background: var(--chat-color-surface);
                color: var(--chat-color-text);
                resize: none;
                font-family: inherit;
                font-size: 14px;
                line-height: 1.5;
                max-height: 120px;
                min-height: 48px;
                transition: var(--chat-transition);
            }

            .admin-chat-widget .chat-textarea:focus {
                outline: none;
                border-color: var(--chat-color-primary);
                box-shadow: 0 0 0 3px rgba(51, 153, 255, 0.2);
            }

            .admin-chat-widget .chat-textarea::placeholder {
                color: var(--chat-color-text-light);
            }

            .admin-chat-widget .chat-submit {
                background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
                color: white;
                border: none;
                border-radius: var(--chat-radius-md);
                width: 48px;
                height: 48px;
                cursor: pointer;
                transition: var(--chat-transition);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                box-shadow: var(--chat-shadow-sm);
            }

            .admin-chat-widget .chat-submit:hover {
                transform: scale(1.05);
                box-shadow: var(--chat-shadow-md);
            }

            .admin-chat-widget .chat-submit svg {
                width: 22px;
                height: 22px;
            }

            .admin-chat-widget .suggested-questions {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin: 12px 0;
                align-self: flex-start;
                max-width: 85%;
            }

            .admin-chat-widget .suggested-question-btn {
                background: #f3f4f6;
                border: 1px solid var(--chat-color-light);
                border-radius: var(--chat-radius-md);
                padding: 10px 14px;
                text-align: left;
                font-size: 13px;
                color: var(--chat-color-text);
                cursor: pointer;
                transition: var(--chat-transition);
                font-family: inherit;
                line-height: 1.4;
            }

            .admin-chat-widget .suggested-question-btn:hover {
                background: var(--chat-color-light);
                border-color: var(--chat-color-primary);
            }

            .admin-chat-widget .chat-link {
                color: var(--chat-color-primary);
                text-decoration: underline;
                word-break: break-all;
                transition: var(--chat-transition);
            }

            .admin-chat-widget .chat-link:hover {
                color: var(--chat-color-secondary);
                text-decoration: underline;
            }

            .admin-chat-widget .chat-welcome {
                padding: 40px 20px;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100%;
                background: #f9fafb;
            }

            .admin-chat-widget .chat-welcome-title {
                font-size: 22px;
                font-weight: 700;
                color: var(--chat-color-text);
                margin-bottom: 24px;
                line-height: 1.3;
            }

            .admin-chat-widget .chat-start-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 14px 20px;
                background: linear-gradient(135deg, var(--chat-color-primary) 0%, var(--chat-color-secondary) 100%);
                color: white;
                border: none;
                border-radius: var(--chat-radius-md);
                cursor: pointer;
                font-size: 15px;
                transition: var(--chat-transition);
                font-weight: 600;
                font-family: inherit;
                margin-bottom: 16px;
                box-shadow: var(--chat-shadow-md);
            }

            .admin-chat-widget .chat-start-btn:hover {
                transform: translateY(-2px);
                box-shadow: var(--chat-shadow-lg);
            }

            .admin-chat-widget .chat-response-time {
                font-size: 14px;
                color: var(--chat-color-text-light);
                margin: 0;
            }
        `;
    document.head.appendChild(widgetStyles);

    // Create the chat widget
    createChatWidget();
  };

  const createChatWidget = () => {
    const settings = window.ChatWidgetConfig;
    let conversationId = '';
    let isWaitingForResponse = false;

    // Create widget DOM structure
    const widgetRoot = document.createElement('div');
    widgetRoot.className = 'admin-chat-widget';

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';

    // Create welcome screen with header
    const welcomeScreenHTML = `
            <div class="chat-header">
                <img class="chat-header-logo" src="${settings.branding.logo}" alt="${settings.branding.name}">
                <span class="chat-header-title">${settings.branding.name} - Admin Chat</span>
            </div>
            <div class="chat-welcome">
                <h2 class="chat-welcome-title">${settings.branding.welcomeText}</h2>
                <button class="chat-start-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Start Admin Chat
                </button>
                <p class="chat-response-time">${settings.branding.responseTimeText}</p>
            </div>
        `;

    // Create chat interface
    const chatInterfaceHTML = `
            <div class="chat-body" style="display: none;">
                <div class="chat-messages"></div>
                <div class="chat-controls">
                    <textarea class="chat-textarea" placeholder="Type your message here..." rows="1"></textarea>
                    <button class="chat-submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 2L11 13"></path>
                            <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;

    chatWindow.innerHTML = welcomeScreenHTML + chatInterfaceHTML;
    widgetRoot.appendChild(chatWindow);

    // Add to container
    if (containerRef.current) {
      containerRef.current.appendChild(widgetRoot);
    }

    // Get DOM elements
    const startChatButton = chatWindow.querySelector('.chat-start-btn');
    const chatBody = chatWindow.querySelector('.chat-body');
    const chatWelcome = chatWindow.querySelector('.chat-welcome');
    const messagesContainer = chatWindow.querySelector('.chat-messages');
    const messageTextarea = chatWindow.querySelector('.chat-textarea');
    const sendButton = chatWindow.querySelector('.chat-submit');

    // Helper functions
    function createSessionId() {
      return crypto.randomUUID();
    }

    function createTypingIndicator() {
      const indicator = document.createElement('div');
      indicator.className = 'typing-indicator';
      indicator.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
      return indicator;
    }

    function linkifyText(text) {
      const urlPattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      return text.replace(urlPattern, function (url) {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="chat-link">${url}</a>`;
      });
    }

    // Start chat directly (no registration needed for admin)
    async function startChat() {
      conversationId = createSessionId();

      chatWelcome.style.display = 'none';
      chatBody.style.display = 'flex';

      // Show typing indicator
      const typingIndicator = createTypingIndicator();
      messagesContainer.appendChild(typingIndicator);

      try {
        // Initialize conversation
        const initData = {
          action: 'loadPreviousSession',
          sessionId: conversationId,
          route: settings.webhook.route,
          metadata: {
            userId: 'admin',
            userName: 'Administrator'
          }
        };

        const response = await fetch(settings.webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(initData)
        });

        const responseData = await response.json();

        // Remove typing indicator
        messagesContainer.removeChild(typingIndicator);

        // Display initial bot message
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-bubble bot-bubble';
        const messageText =
          'Welcome to Cloud Botics Consultancy Admin Chat. I am SuAI, your Virtual Assistant. How can I assist you today?';
        botMessage.innerHTML = linkifyText(messageText);
        messagesContainer.appendChild(botMessage);

        // Add suggested questions if configured
        if (
          settings.suggestedQuestions &&
          Array.isArray(settings.suggestedQuestions) &&
          settings.suggestedQuestions.length > 0
        ) {
          const suggestedQuestionsContainer = document.createElement('div');
          suggestedQuestionsContainer.className = 'suggested-questions';

          settings.suggestedQuestions.forEach((question) => {
            const questionButton = document.createElement('button');
            questionButton.className = 'suggested-question-btn';
            questionButton.textContent = question;
            questionButton.addEventListener('click', () => {
              submitMessage(question);
              if (suggestedQuestionsContainer.parentNode) {
                suggestedQuestionsContainer.parentNode.removeChild(suggestedQuestionsContainer);
              }
            });
            suggestedQuestionsContainer.appendChild(questionButton);
          });

          messagesContainer.appendChild(suggestedQuestionsContainer);
        }

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } catch (error) {
        console.error('Chat initialization error:', error);

        const indicator = messagesContainer.querySelector('.typing-indicator');
        if (indicator) {
          messagesContainer.removeChild(indicator);
        }

        const errorMessage = document.createElement('div');
        errorMessage.className = 'chat-bubble bot-bubble';
        errorMessage.textContent = "Sorry, I couldn't connect to the server. Please try again later.";
        messagesContainer.appendChild(errorMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }

    // Send message function
    async function submitMessage(messageText) {
      if (isWaitingForResponse) return;

      isWaitingForResponse = true;

      const requestData = {
        action: 'sendMessage',
        sessionId: conversationId,
        route: settings.webhook.route,
        chatInput: messageText,
        metadata: {
          userId: 'admin',
          userName: 'Administrator'
        }
      };

      // Display user message
      const userMessage = document.createElement('div');
      userMessage.className = 'chat-bubble user-bubble';
      userMessage.textContent = messageText;
      messagesContainer.appendChild(userMessage);

      // Show typing indicator
      const typingIndicator = createTypingIndicator();
      messagesContainer.appendChild(typingIndicator);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      try {
        const response = await fetch(settings.webhook.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestData)
        });

        const responseData = await response.json();

        // Remove typing indicator
        messagesContainer.removeChild(typingIndicator);

        // Display bot response
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-bubble bot-bubble';
        const responseText = Array.isArray(responseData) ? responseData[0].output : responseData.output;
        botMessage.innerHTML = linkifyText(responseText);
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } catch (error) {
        console.error('Message submission error:', error);

        messagesContainer.removeChild(typingIndicator);

        const errorMessage = document.createElement('div');
        errorMessage.className = 'chat-bubble bot-bubble';
        errorMessage.textContent = "Sorry, I couldn't send your message. Please try again.";
        messagesContainer.appendChild(errorMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } finally {
        isWaitingForResponse = false;
      }
    }

    // Auto-resize textarea
    function autoResizeTextarea() {
      messageTextarea.style.height = 'auto';
      messageTextarea.style.height = (messageTextarea.scrollHeight > 120 ? 120 : messageTextarea.scrollHeight) + 'px';
    }

    // Event listeners
    startChatButton.addEventListener('click', startChat);

    sendButton.addEventListener('click', () => {
      const messageText = messageTextarea.value.trim();
      if (messageText && !isWaitingForResponse) {
        submitMessage(messageText);
        messageTextarea.value = '';
        messageTextarea.style.height = 'auto';
      }
    });

    messageTextarea.addEventListener('input', autoResizeTextarea);

    messageTextarea.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const messageText = messageTextarea.value.trim();
        if (messageText && !isWaitingForResponse) {
          submitMessage(messageText);
          messageTextarea.value = '';
          messageTextarea.style.height = 'auto';
        }
      }
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5'
      }}
    >
      {/* Chat Widget Container */}
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          overflow: 'none',
          display: 'flex',
          flexDirection: 'column',
          p: 0
        }}
      />
    </Box>
  );
}
