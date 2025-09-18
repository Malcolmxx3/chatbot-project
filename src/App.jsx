import { useState, useEffect } from 'react'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import { Chatbot } from 'supersimpledev'; 
import './App.css' 
  

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];
  useEffect(() => {
    Chatbot.addResponses({
      'Can we go on a date': 'I would love to',
      'What is your name?': 'I am a chatbot, I do not have a name'
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages])

  
  return (
    <div className="app-container">
      {chatMessages.length === 0 
        ? <div className="chat-messages-container"><p>Welcome to chatbot project! Send a message using the textbox below</p></div>
        : <ChatMessages 
        chatMessages={chatMessages} 
      />}
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
