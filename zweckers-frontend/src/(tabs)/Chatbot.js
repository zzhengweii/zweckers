import '../styles/Chatbot.css';
import Message from '../components/Message.js';
import { useState } from 'react';

function Chatbot() {
    const [messages, setMessages] = useState([
        { isBot: true, name: 'botER', text: 'How may I help you today?' },
        { isBot: false, name: 'You', text: 'What is an ER diagram?' },
    ]);
    const [inputText, setInputText] = useState(''); // Manage input text

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
            <div>
                {messages.map((msg, index) => (
                    <Message
                        key={index}
                        isBot={msg.isBot}
                        name={msg.name}
                        text={msg.text}
                    />
                ))}
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
                        onChange={(e) => setInputText(e.target.value)} // Update inputText state
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
