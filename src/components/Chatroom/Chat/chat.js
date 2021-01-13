import React, { useState, useEffect, useContext } from "react";
import {useParams} from 'react-router-dom';
// import queryString from 'query-string';
// import socket from "../../socket.io";
import { InfoBar } from '../InfoBar/infoBar';
// import { Input } from '../Input/input';
import { Messages } from '../Messages/messages';
// import { TextContainer } from '../TextContainer/TextContainer'
// import { Context } from "../../Constant/context";
import './chat.css';
// import { PinDropSharp } from "@material-ui/icons";

// let socket;

export const Chat = (props) => {
  const {id} = useParams();
  const token = JSON.parse(localStorage.getItem('token'));
  // const [name, setName] = useState('');
  // const [room, setRoom] = useState('');
  // const [users, setUsers] = useState('');
  // const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  // const [context, setContext] = useContext(Context);

  useEffect(()  => {
    const getRes = async ()  =>{
    const res = await fetch("http://localhost:3000/chat/match-chat",{
      // const res = await fetch("https://apiadmin-caro.herokuapp.com/user/users",{
        method: 'POST',
        headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      }),
    })
    if(res.status===200){
        console.log("Vo 200OK")
        const historychat = await res.json();
        console.log("history chat: "+historychat.historyChat.chat);
        for(let i=0;i<historychat.historyChat.chat.length;i++){
          setMessages(msgs => [...msgs, historychat.historyChat.chat[i]]);
        }
    }else{
        const result = await res.json();
        alert(result.message);
    }
  }
  getRes();
  }, [])

  // const ENDPOINT = 'http://localhost:5000/';
  // console.log(props.roomInfo);
  

  // useEffect(() => {
  //   // const { name, room } = queryString.parse(location.search);

  //   // socket = io(ENDPOINT);
    
  //   setRoom(props.roomInfo.id);
    
  //   // ----------------------localstorage------------------------------------
  //   setName(localStorage.getItem('name'));
  //   socket.emit('join_chat', { name: localStorage.getItem('name'), room: props.roomInfo.id }, (error) => {
  //     if (error) {
  //       alert(error);
  //     }
  //   });
    //----------------------------------------------------------------------------
    // setName(context.name);
    // socket.emit('join_chat', { name: context.name, room: props.roomInfo.id }, (error) => {
    //   if (error) {
    //     alert(error);
    //   }
    // });
  // }, []);
  //   }, [ENDPOINT, location.search]);

  //  socket.off('message');
  // socket.on('message', message => {
  //   setMessages(msgs => [...msgs, message]);
  // });

  // socket.on("roomData", ({ users }) => {
  //   setUsers(users);
  // });


  // const sendMessage = (event) => {
  //   event.preventDefault();

  //   if (message) {
  //     socket.emit('sendMessage', message, () => setMessage(''));
  //   }
  // }
  return (
    <div>
      <div style={{ backgroundColor: "black" }}>

      </div>
      <div className="outerContainer">
        {/* <TextContainer users={users} /> */}
        <div className="container">
          <InfoBar />
          <Messages messages={messages} />
          {/* <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> */}
        </div>
      </div>
    </div>

  );
}