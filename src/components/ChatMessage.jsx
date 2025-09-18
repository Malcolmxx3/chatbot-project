import RobotProfileImage from '../assets/robot-icon.png';
import UserProfileImage from '../assets/user.jpg';
import dayjs from 'dayjs';
import './ChatMessage.css';

function ChatMessage({ message, sender, time}) {
  

  return (
    <div className={
      sender === 'user' 
        ? 'chat-message-user' 
        : 'chat-message-robot'
    }>
      {sender === "robot" && (
        <img 
          src={RobotProfileImage} 
          className="chat-message-profile" 
        />
      )}
      <div className="chat-message-text">
        {message}
        {time && <p className="chat-message-time">
          {dayjs(time).format('h:mma')}
        </p>}
      </div>
      {sender === "user" && (
        <img 
          src={UserProfileImage} 
          className="chat-message-profile" 
        />
      )}
    </div>
  )
}

export default ChatMessage;