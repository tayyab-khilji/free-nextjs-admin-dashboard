import { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import Image from 'next/image';

type Message = {
    sender: 'bot' | 'user';
    text: string;
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'bot',
            text: "Good morning, Mr. Smith. Thank you for coming in today. Let's start with a few questions to get to know you better. Can you tell me about your previous work experience?"
        },
        {
            sender: 'user',
            text: "Good morning! Thank you for having me. Certainly. I've spent the past ten years working in sales and marketing, primarily in the technology sector. I've had the opportunity to lead successful teams.\n\nOf course. One particular challenge I faced was when our company launched a new product line amidst intense competition. Our sales were initially slow, and we needed to quickly pivot our marketing approach. I spearheaded a cross-functional team to analyze market trends, refine our messaging, and implement targeted advertising campaigns. Through collaborative efforts and strategic adjustments, we were able to surpass our sales targets within three months."
        },
        {
            sender: 'bot',
            text: "That's excellent problem-solving skills, Mr. Smith. Now, moving forward, what do you consider your greatest strength and how would it benefit our company?"
        },
        {
            sender: 'user',
            text: "I believe my greatest strength lies in my ability to adapt to changing environments and find innovative solutions to complex challenges. In today’s dynamic business landscape, it’s crucial to stay agile and proactive."
        },
        {
            sender: 'user',
            text: "In the next five years, I envision myself in a leadership role, driving impactful initiatives and mentoring the next generation of professionals. I’m drawn to this position because I see it as an opportunity to leverage my expertise and make a meaningful contribution to your company’s strategic objectives."
        },
    ]);

    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'bot' && (
                            <div className="flex-shrink-0">
                                <FaRobot className="text-gray-400 w-8 h-8" />
                            </div>
                        )}
                        <div
                            className={`max-w-md px-4 py-3 rounded-lg whitespace-pre-line ${msg.sender === 'bot'
                                    ? 'bg-gray-100 text-gray-800 ml-2'
                                    : 'bg-blue-100 text-blue-900 mr-2'
                                }`}
                        >
                            {msg.text}
                        </div>
                        {msg.sender === 'user' && (
                            <div className="flex-shrink-0">
                                <Image
                                    src="/profile.jpg" // Replace with your public profile image path
                                    alt="User"
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="border-t px-4 py-2 flex items-center">
                <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button onClick={handleSend} className="ml-2 text-blue-600 hover:text-blue-800">
                    <FiSend size={24} />
                </button>
            </div>
        </div>
    );
}
