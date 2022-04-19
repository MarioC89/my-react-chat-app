import { useState, useEffect, useRef } from "react";
import "./styles/main.css"
import Input from "./Components/Input";
import Message from "./Components/Message";
import avatar1 from "./Components/images/avatar-1.png"
import avatar2 from "../src/Components/images/avatar-2.png"
import avatar3 from "../src/Components/images/avatar-3.png"
import { Scrollbars } from 'react-custom-scrollbars-2';


function App() {
  const [user, setUser] = useState({
    username: "",
    randomColor: "",
    avatar: "",
    avatarID: 0
  });

  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState();
  const [users, setUsers] = useState();
  const [avatar, setAvatar] = useState();
  const [userNames, setUserNames] = useState();
  const [userSubmitted, setUserSubmitted] = useState(false);

  const [chatScroll, setChatScroll] = useState(true)
  const scrollRef = useRef()

  useEffect(() => {
    if (userSubmitted) {
      const drone = new window.Scaledrone("i34Mw2dK1IjmKOiG", {
        data: user,
        avatar   
      });
      setDrone(drone);
    }
  }, [userSubmitted, avatar, user]);

  useEffect(() => {
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

          const time = new Date();
          const currentTime = time.getHours() + ":" + time.getMinutes()

          const username = chatUser.clientData.username;
          const chatUserID = chatUser.id;
          const userColor = chatUser.clientData.randomColor;
          const userAvatar = chatUser.clientData.avatar;

          /* console.log('username');
          console.log(username); */
                    
          setMessages((oldArray) => [
            ...oldArray,
            { text, username, userColor, chatUserID, user, userAvatar, currentTime },
          ]);
        });
      });
    }
  }, [user, drone])

  const onSendMessage = (message) => {
    if (message) {
      drone.publish({
        room: "observable-room",
        message,
        avatar
      });
    }
  };
  
  const setMyAvatar = (props) => {
    if (props.avatar === "avatar1") {
      return avatar1
    }

    if (props.avatar === "avatar2") {
      return avatar2
    }

    if (props.avatar === "avatar3") {
      return avatar3
    }
  }

  useEffect(() => {
    if (chatScroll) {
      scrollRef.current.scrollToBottom()
    }
  }, [chatScroll, messages])

  const onScrollHandler = () => {
    const acceptableScrollOffset = 20
    const scrollHeight = scrollRef.current.getScrollHeight()
    const scrollTop = scrollRef.current.getScrollTop()
    const clientHeight = scrollRef.current.getClientHeight()

    if (scrollHeight - scrollTop - clientHeight < acceptableScrollOffset) {
      setChatScroll(true)
    }
    else {
      setChatScroll(false)
    }
  }
  
  return (
    <div className="App">
      <div className="App-header">
        <h1 className="title">My React Chat App</h1>
      </div>

      <Scrollbars
        style={{ width: '100%', height: '100%' }}
        ref={scrollRef}
        onScroll={onScrollHandler}
        autoHide
      > 
          {
            !userSubmitted ?

              <div className="main">
                <h1>First type your chat name and pick
                  an avatar</h1>
                <h3>Choose one from existing avatars</h3>

                <div className="avatar-picker">
                  <img src={avatar1} onClick={() => setMyAvatar("avatar1")} alt="" />
                  <img src={avatar2} onClick={() => setAvatar("avatar2")} alt="" />
                  <img src={avatar3} onClick={() => setAvatar("avatar3")} alt="" />
                </div>

                <h3>Pick avatar background color</h3>

                <div className="color-picker">
                  <input type="color" value={user.randomColor} onChange={(e) => setUser(prevValues => ({ ...prevValues, randomColor: e.target.value }))} />
                </div>

                <div className="chat-name">
                  <input className="ime" value={user.username} type="text" placeholder="Enter chat name" onChange={(e) => setUser(prevValues => ({ ...prevValues, username: e.target.value }))} />
                </div>

                <button onClick={() => setUserSubmitted(true)} type="submit" disabled={user.username.length < 3 ? true : false}>Enter</button>
              </div>

            :

            <div className="chat-window">
              <Message messages={messages} users={users} userNames={userNames} />
              <Input onSendMessage={onSendMessage} />
            </div>
          }
      </Scrollbars>
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