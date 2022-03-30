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

  const [currentTime, setCurrentTime] = useState()


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
          { text, username, userColor, chatUserID, user, userAvatar, currentTime },
        ]);
      });
    });
  }

  const onSendMessage = (message) => {
    if (message) {
      let time = new Date();
      setCurrentTime(time.getHours() + ":" +  time.getMinutes())

      drone.publish({
        room: "observable-room",
        message,
        
      });
    }
  };


  useEffect(() => {
    console.log('currentTime');
    console.log(currentTime);
  }, [currentTime])
  
  

 /*  const timeStamp = new Date()
  console.log(timeStamp.getHours());
  console.log(timeStamp.getMinutes());

  const stamp = timeStamp.getHours + timeStamp.getMinutes */

  // COLOR PICKER
  const ColorPicker = () => {
  const [ color, setColor ] = useState(null);
    	console.log("colorPicker", color);
  }
  
 const [activeScreen, setActiveScreen] = useState(true)
  
  const ludaFunc = () => {
    setActiveScreen(false)
    console.log(setActiveScreen)
    console.log(3445);
  }
  

  return (
    <div className="App">
        <div className="App-header">
          <h1 className="title">My React Chat App</h1>
        </div>

        {
       activeScreen ? 

        (<div className="main">
          <h1>First type your chat name and pick
            an avatar</h1>
          <h3>Choose one from existing avatars</h3>

          
          <div className="avatar-picker">

          </div>
          <div className="color-picker">
            <input type="color" />
          </div>
      
          <div className="chat-name">
            <input value={user.username} type="text" onChange={(e) => setUser(prevValues => ({...prevValues, username: e.target.value}))}/>
          </div>
          <button onClick={() => ludaFunc()} type="submit" >Enter</button>
        </div>)

        :

        (<div className="chat-window">
          <Message messages={messages} users={users} userNames={userNames}/>
          <Input onSendMessage={onSendMessage} />
        </div>)
} 
        
    </div>


    
  );
}

export default App;




// figma design
// https://www.figma.com/file/3ZdtWRE6gCGLJ3U6D1TwiM/Glare-Chat-Interface-(Community)?node-id=2%3A16


/* Dodatni zadaci za one koji naprave osnovnu funkcionalnu verziju chat aplikacije:

- dizajn sa linka unutar fajla figma-design
- omogućiti korisniku odabir imena, boje pozadine i slike avatara prije početka chata. Tek nakon odabira, omogućiti pisanje poruka
- omogućiti dodavanje emotikona u poruku
- timestamp uz svaku poruku
- kad se napiše puno poruka, odscrollati me do dna nakon dodavanja nove
- custom scrollbar - npr. https://idiotwu.github.io/smooth-scrollbar/ */