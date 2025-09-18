import { useState } from 'react';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import LoadingSpinner from '../assets/loading-spinner.gif';
import './ChatInput.css';

function ChatInput({ chatMessages, setChatMessages }) {
  const [textInput, setTextInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setTextInput(event.target.value)
  }

  async function sendMessage() {

    if (isLoading || textInput === '') {
      return 
    }

    setIsLoading(true);

    const newChatMessages = [
      ...chatMessages,
      {
        message: textInput,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]

    setChatMessages(newChatMessages);

    setTextInput('')

    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="spinner" src={LoadingSpinner} />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(textInput);
    
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);
    
    setIsLoading(false);
  }

  function clearMessage() {
    setChatMessages([]);
  }

  function onKeyPress(event) {
    event.key === 'Enter' && sendMessage();
    event.key === 'Escape' && setTextInput('');
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="30" 
        onChange={saveInputText}
        value={textInput}
        onKeyDown={onKeyPress}
        className="chat-input"
      />
      <button 
        onClick={sendMessage}
        className="send-button"
      >Send</button>
      <button
        onClick={clearMessage}
        className="clear-button"
      >Clear</button>
    </div>
  );
}

export default ChatInput;