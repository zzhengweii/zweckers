import '../styles/Chatbot.css';
import Message from '../components/Message.js';
import { useState, useRef, useEffect } from 'react';
import { marked } from "marked";

function Chatbot() {
    const [messages, setMessages] = useState([
        { isBot: true, name: 'botER', text: 'How may I help you today?' },
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputText.trim() && !isLoading) { // Prevent sending if loading
            setIsLoading(true); // Disable input while waiting

            setMessages(prev => [
                ...prev,
                { isBot: false, name: 'You', text: inputText },
            ]);

            try {
                const response = await fetch("http://127.0.0.1:5000/get", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({ msg: inputText }),
                });

                const botReply = await response.text();

                setMessages(prev => [
                    ...prev,
                    { isBot: true, name: 'botER', text: botReply },
                ]);
            } catch (error) {
                console.error("Error fetching bot response:", error);
            }

            setIsLoading(false); // Re-enable input after response
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
                        text={<div dangerouslySetInnerHTML={{ __html: marked(msg.text) }} />}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="TextBox">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={isLoading ? "Waiting for response..." : "Message botER."}
                        className="TextInput"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={isLoading} // Disable input when loading
                    />
                    <button type="submit" style={{ background: 'none', border: 'none' }} disabled={isLoading}>
                        <ion-icon name={isLoading ? "hourglass-outline" : "arrow-up-circle"}></ion-icon>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Chatbot;
