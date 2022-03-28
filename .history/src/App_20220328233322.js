import { useState, useEffect } from "react";
import Input from "./Components/Input";
import Message from "./Components/Message";
import nouns from "./Components/Data/nouns";
import adjectives from "./Components/Data/adjectives";

function randomName() {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

const randomNumber = () => {
  return Math.floor(Math.random() * 100)
};

function App() {

  const [user, setUser] = useState({
    username: randomName(),
    randomColor: randomColor(),
    avatar: randomNumber()
  });

  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState();
  const [users, setUsers] = useState();
  const [rngName, setRngName] = useState("");
  const [userNames, setUserNames] = useState();
  const [userState, setUserState] = useState(false);


  useEffect(() => {
    fetch("https://randomuser.me/api/?results=200&inc=name&noinfo")
      .then((response) => response.json())
      .then((data) => {
        setUserNames(data.results);
        setUserState(true);
      });
  }, []);



  useEffect(() => {
    const drone = new window.Scaledrone("i34Mw2dK1IjmKOiG", {
      data: user,
    });
    setDrone(drone);
    // eslint-disable-next-line
  }, []);

  if (drone) {
    drone.on("open", (error) => {
      if (error) {
        console.log("Error on connecting", error);
      }

     

      const chatRoom = drone.subscribe("observable-room");

      chatRoom.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        // Connected to room
      });

      chatRoom.on("data", (text, chatUser) => {
         setUsers(drone.clientId);
        

        const username = chatUser.clientData.username;
        const chatUserID = chatUser.id;
        const userColor = chatUser.clientData.randomColor;
        const userAvatar = chatUser.clientData.avatar;
        
        setMessages((oldArray) => [
          ...oldArray,
          { text, username, userColor, chatUserID, user, userAvatar },
        ]);
      });
    });
  }

  const onSendMessage = (message) => {
    if (message) {
      drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>My Chat App</h1>
      </div>
      <Message messages={messages} users={users} userNames={userNames}/>
      <Input onSendMessage={onSendMessage} />
    </div>


    
  );
}

export default App;
