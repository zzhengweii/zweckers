import '../styles/Chatbot.css';
import axios from 'axios';
import Message from '../components/Message.js';
import { useState, useRef, useEffect } from 'react';


function Chatbot() {
    const [messages, setMessages] = useState([
        { isBot: true, name: 'botER', text: 'How may I help you today?' },
    ]);
    const [inputText, setInputText] = useState(''); // Manage input text
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]); // Runs when messages update

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh
        if (inputText.trim()) {
            // Add user message to messages array
            setMessages((prevMessages) => [
                ...prevMessages,
                { isBot: false, name: 'You', text: inputText },
            ]);

            // Simulate a bot response
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { isBot: true, name: 'botER', text: "I'm here to help with ER diagrams!" },
                ]);
            }, 1000);

            // Clear input field
            setInputText('');
        }
    };

    return (
        <div className="Container">
            {/* Header */}
            <div>
                <p className="Header">Your ER Diagram Questions, Answered Here</p>
                <p className="Subtitles">Powered by ChatGPT</p>
            </div>

            {/* Chat Messages */}
            <div className="Messages">
                {messages.map((msg, index) => (
                    <Message
                        key={index}
                        isBot={msg.isBot}
                        name={msg.name}
                        text={msg.text}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Text Box */}
            <div className="TextBox">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="url"
                        placeholder="Message botER."
                        className="TextInput"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button type="submit" style={{ background: 'none', border: 'none' }}>
                        <ion-icon name="arrow-up-circle"></ion-icon>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chatbot;
