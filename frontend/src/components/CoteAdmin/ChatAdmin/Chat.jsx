import { useEffect, useRef, useState } from "react";
import './Chat.css';
import { io } from "socket.io-client";
import axios from 'axios';
import Conversation from "./conversation";
import { useUser } from '../../UserContext';
import Message from "./message";
function ChatAdminpage() {
  const [utilisateur, setUtilisateur] = useState([]);
  const [adminId, setAdminId] = useState([]); 
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]); 
  const [newMessage, setNewMessage] = useState(""); 
  const [arrivalMessage, setArrivalMessage] = useState(null); 
  const socket = useRef(); // Référence au socket
  const { user } = useUser(); // Utilisateur connecté via le contexte
  const scrollRef = useRef(); // Référence pour faire défiler les messages
  const userId = user?._id; // ID de l'utilisateur connecté
  const UserRoleConnect = user?.role;
console.log(user)
  // Initialisation du socket
  useEffect(() => {
    socket.current = io("ws://localhost:3001");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        receipt: data.receiverId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   socket.current.emit("addUser", user._id);
  //   socket.current.on("getUsers", (users) => {
  //     setOnlineUsers(
  //       user.followings.filter((f) => users.some((u) => u.userId === f))
  //     );
  //   });
  // }, [user]);
  //
  // useEffect(() => {
  //   socket.current = io("ws://localhost:3001");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);
 
  const addMembers = async (utilisateurs) => {
    try {
      console.log(utilisateurs)
      const conversationsPromises = utilisateurs.map(async (utilisateur) => {
        const formData = {
          members: [
            {_id: utilisateur._id, cin: utilisateur.cin, nom: utilisateur.nom, email: utilisateur.email, role:utilisateur.role,image: utilisateur.image }
          ]
        };
        console.log("ff",formData);
        const res = await axios.post("http://localhost:3001/salle/" ,formData)
        return res.data;
        //console.log(res.data);
      });

      const conversations = await Promise.all(conversationsPromises);
      console.log("Conversations créées :", conversations);
    } catch (error) {
      console.error("Erreur lors de la création des conversations :", error);
    }
  };
  // Récupération des données utilisateur et de l'ID de l'administrateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/auth/");
        const utilisateurs = res.data;
        setUtilisateur(utilisateurs);
        const admin = utilisateurs.find(user => user.role === 'Admin');
        const adminId = admin ? admin._id : null;
        setAdminId(adminId);
        addMembers(utilisateurs);
      //  if ( UserRoleConnect === "Admin") {
      //   addMembers(utilisateur);
      // }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };
    fetchUser();
  }, []);

  // Récupération des conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        if(UserRoleConnect==="Admin"){
        const res = await axios.get(`http://localhost:3001/salle/${userId}/${UserRoleConnect}`);
        setConversations(res.data);
        }else{
          const res = await axios.get(`http://localhost:3001/salle/${adminId}/${UserRoleConnect}`);
        setConversations(res.data);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des conversations :", err.response.data.error);
      }
    };
    getConversations();
  }, [utilisateur, UserRoleConnect]);

  // Récupération des messages de la conversation actuelle
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/Message/${currentChat?._id}/${user?._id}/${currentChat?.members[0]._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des messages :", err.response.data.error);
      }
    };
    getMessages();
  }, [currentChat]);
  
  // Envoi d'un message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentChat) {
      console.error("currentChat is not defined");
      return;
    }
    const message = {
      receipt:currentChat.members[0]._id,
      sender:user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members[0]._id;
    console.log("receiverId",receiverId)
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const formData={
        senderId: user._id,
      receiverId: currentChat.members[0]._id,
      }
      const result = await axios.post('http://localhost:3001/Conversations/',formData);
      console.log(result.data);
      const res = await axios.post("http://localhost:3001/Message/", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Erreur lors de l'envoi du message :", err.response.data.error);
    }
  };

  // Effet de scrolling automatique
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {Array.isArray(conversations) && conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
            {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {/* Affichage des utilisateurs en ligne */}
          </div>
        </div>
      </div>
    </>
  );
}
export default ChatAdminpage;