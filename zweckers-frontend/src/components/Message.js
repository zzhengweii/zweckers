import '../styles/Message.css';

function Message({ isBot, name, text }) {
    return (
        <div className={`MessagesContainer ${isBot ? 'bot' : 'user'}`}>
            {/* For bot, show name first, then message */}
            {isBot ? (
                <>
                    <p className="MessagePerson">{name}</p>
                    <p className="Message">{text}</p>
                </>
            ) : (
                /* For user, show message first, then name */
                <>
                    <p className="Message">{text}</p>
                    <p className="MessagePerson">{name}</p>
                </>
            )}
        </div>
    );
}

export default Message;
