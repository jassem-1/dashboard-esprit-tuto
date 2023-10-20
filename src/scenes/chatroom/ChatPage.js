import React, { useState ,useEffect} from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import "./ChatPage.css"
import Header from "../../components/Header";
import { Box } from "@mui/material";

var stompClient = null;
export default function Chatroom() {
  const [memberList, setMemberList] = useState([]);
  const [joinedMembers, setJoinedMembers] = useState([]);

  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    connected: false,
    message: "",
  });
  const [tab, setTab] = useState("CHATROOM");
  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((response) => response.json())
      .then((data) => {
        const members = data.map((user) => user.username);
        setMemberList(members);
      })
      .catch((error) => console.error("Error fetching member list:", error));
  }, []);


  const handleValue = (event) => {
    const { value,name } = event.target;
    setUserData({ ...userData, [name]: value });
  };


  const registerUser = async () => {
    console.log("Registering user...");
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
  
    try {
      const response = await fetch(`http://localhost:8080/users/join-chatroom/${userData.username}`, {
        method: "POST",
      });
  
      if (response.ok) {
        console.log("User joined successfully");
      } else {
        console.error("Failed to join user");
      }
    } catch (error) {
      console.error("Error joining user:", error);
    }
  
    stompClient.connect({}, onConnected, onError);
  };
  

  const onConnected = () => {
    console.log("WebSocket connection established!xxxxx");
    setUserData({ ...userData, connected: true });
    stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
    stompClient.subscribe('/user/' + userData.username + '/private',onPrivateMessageReceived);
    userJoin();
    setMemberList((prevList) => [...prevList, userData.username]);
   };


   const userJoin = () => {
    if (!joinedMembers.includes(userData.username)) {
      let chatMessage = {
        senderName: userData.username,
        status: "JOIN",
        currentMembers: memberList,
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      
      setJoinedMembers((prevJoinedMembers) => [...prevJoinedMembers, userData.username]);
    }
  };
  
const onPublicMessageReceived = (payload) => {
  let payloadData = JSON.parse(payload.body);
  switch (payloadData.status) {
    case "JOIN":
      if (!privateChats.has(payloadData.senderName)) {
        privateChats.set(payloadData.senderName, []);
        setPrivateChats(new Map(privateChats));
      }
      setMemberList((prevList) => [...prevList, payloadData.senderName]);
      break;
    case "MESSAGE":
      setPublicChats((prevChats) => [...prevChats, payloadData]);
      break;
    default:
      break;
  }
};

const onPrivateMessageReceived = (payload) => {
  try {
    let payloadData = JSON.parse(payload.body);

    if (payloadData && payloadData.senderName) {
      setPrivateChats((prevChats) => {
        const updatedChats = new Map(prevChats);
        if (updatedChats.has(payloadData.senderName)) {
          updatedChats.get(payloadData.senderName).push(payloadData);
        } else {
          updatedChats.set(payloadData.senderName, [payloadData]);
        }
        return updatedChats;
      });
    } else {
      console.error("Invalid payloadData:", payloadData);
    }
  } catch (error) {
    console.error("Error parsing payload.body:", error);
  }
};


const sendPublicMessage = async () => {
  if (stompClient) {
    const chatMessage = {
      senderName: userData.username,
      message: userData.message,
      status: "MESSAGE",
    };

    try {
      const response = await fetch("http://localhost:8080/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatMessage),
      });

      if (response.ok) {
        console.log("Message sent successfully");
        setPublicChats((prevChats) => [...prevChats, chatMessage]);
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setUserData({ ...userData, message: "" });
  }
};


const onError = (error) => {
  console.error("WebSocket connection ERROR xxx:", error);
  
};



const sendPrivateMessage = () => {
  if (stompClient) {
    var chatMessage = {
      senderName: userData.username,
      receiverName: tab,
      message: userData.message,
      status: "MESSAGE",
    };

    if (userData.username !== tab) {
      setPrivateChats((prevChats) => {
        const updatedChats = new Map(prevChats);
        if (updatedChats.has(tab)) {
          updatedChats.get(tab).push(chatMessage);
        } else {
          updatedChats.set(tab, [chatMessage]);
        }
        return updatedChats;
      });
    }
    stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    setUserData({ ...userData, message: "" });
  }
};
useEffect(() => {
  // Fetch member list, messages, and joined members from the backend API
  Promise.all([
    fetch("http://localhost:8080/users").then((response) => response.json()),
    fetch("http://localhost:8080/messages").then((response) => response.json()),
    fetch("http://localhost:8080/users/joined-members").then((response) => response.json()), // Fetch joined members
  ])
    .then(([members, messages, joinedMembers]) => {
      const membersList = members.map((user) => user.username);
      setMemberList(membersList);
      setPublicChats(messages.filter((msg) => msg.status === "MESSAGE"));
      
      // Update the joinedMembers state with the joined members
      setJoinedMembers(joinedMembers.map((user) => user.username));
    })
    .catch((error) => console.error("Error fetching data:", error));
}, []);



  return (
    <Box m="20px ">

    <div className="chat-container">
    <Header title="Chat room" />

      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>
                Chatroom
              </li>
              {[...privateChats.keys(), ...joinedMembers].map((name, index) => (
                <li onClick={() => setTab(name)} className={`member ${tab === name && "active"}`} key={index}>
                  {name}
                </li>
              ))}
              
              
            </ul>
          </div>
          {tab==="CHATROOM" ? ( <div className="chat-content">
                <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li className="message" key={index}>
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && (
                      <div className="avatar self">{chat.senderName}</div>
                    )}
                  </li>
                ))}
                </ul>
                <div className="send-message">
                <input type="text" className="input-message"
                name="message" placeholder="enter public message" value={userData.message}
                onChange={handleValue}/>
                <button type="button" className="send-message" onClick={sendPublicMessage}>send</button>
                </div>
             </div>
             ):(<div className="chat-content">
          <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                    <li className="message" key={index}>
                 {chat.senderName !== userData.username && (
                   <div className="avatar">{chat.senderName}</div>
                 )}
                 <div className="message-data">{chat.message}</div>
                 {chat.senderName === userData.username && (
                   <div className="avatar self">{chat.senderName}</div>
                 )}
               </li>
             ))}
             </ul>
             <div className="send-message">
                <input type="text" className="input-message" 
                name="message" placeholder={`enter PRIVATE message for ${tab}`} value={userData.message}
                onChange={handleValue}/>
                <button type="button" className="send-message" onClick={sendPrivateMessage}>send</button>
                </div>
              </div>)}     
                  
        </div>
      ) : (
        <div className="register">
  <select
    id="user-name"
    name="username"
    value={userData.username}
    onChange={handleValue}
  >
    <option value="">Select a member</option>
    {memberList.map((member) => (
      <option key={member} value={member}>
        {member}
      </option>
    ))}
  </select>
  <button type="button" onClick={registerUser}>
    Register
  </button>
</div>

      )}
    </div>
    </Box>
  );
}