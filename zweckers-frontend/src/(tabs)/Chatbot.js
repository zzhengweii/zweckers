import '../styles/Chatbot.css';
import Message from '../components/Message.js';
import { useState, useRef, useEffect } from 'react';
import { marked } from "marked";

function Chatbot() {
    const [messages, setMessages] = useState([
        { isBot: true, name: 'botER', text: 'How may I help you today?' },
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            // Add user message
            setMessages(prev => [
                ...prev,
                { isBot: false, name: 'You', text: inputText },
            ]);

            try {
                const response = await fetch("http://127.0.0.1:5000/get", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded", // Keep it simple
                    },
                    body: new URLSearchParams({ msg: inputText }), // Send as form data
                });

                const botReply = await response.text(); // Get plain text

                setMessages(prev => [
                    ...prev,
                    { isBot: true, name: 'botER', text: botReply }, // Store raw text
                ]);
            } catch (error) {
                console.error("Error fetching bot response:", error);
            }

            setInputText('');
        }
    };

    return (
        <div className="Container">
            <div>
                <p className="Header">Your ER Diagram Questions, Answered Here</p>
                <p className="Subtitles">Powered by OpenAI</p>
            </div>

            <div className="Messages">
                {messages.map((msg, index) => (
                    <Message
                        key={index}
                        isBot={msg.isBot}
                        name={msg.name}
                        text={<div dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />} /> 
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="TextBox">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
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
