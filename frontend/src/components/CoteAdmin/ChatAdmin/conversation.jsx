import { useEffect, useState } from "react";
import "./Conversation.css";
import axios from "axios";
function Conversation({ conversation, currentUser }) {
  const [otherUser, setOtherUser] = useState(null);
  const [User,setUser]=useState([]);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
console.log("se",currentUser)
    
    // Trouver l'autre utilisateur dans la conversation
    const otherUser = conversation.members.find(member => member._id !== currentUser._id);
    setOtherUser(otherUser);
  }, [conversation, currentUser]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={`http://localhost:3001/images/Utilisateur/Agriculteur/${otherUser?.image || "person/noAvatar.png"}`}
        alt=""
      />
      <span className="conversationName">{otherUser?.nom}</span>
    </div>
  );
}

export default Conversation;
