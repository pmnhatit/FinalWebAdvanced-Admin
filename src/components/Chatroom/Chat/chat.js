import React, { useState, useEffect, useContext } from "react";
import {useParams} from 'react-router-dom';
import { InfoBar } from '../InfoBar/infoBar';
import { Messages } from '../Messages/messages';
import './chat.css';

export const Chat = (props) => {
  const {id} = useParams();
  const token = JSON.parse(localStorage.getItem('token'));
  const [messages, setMessages] = useState([]);

  useEffect(()  => {
    const getRes = async ()  =>{
    const res = await fetch("http://localhost:3000/chat/match-chat",{
      // const res = await fetch("https://apiadmin-caro.herokuapp.com/chat/match-chat",{
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

  return (
    <div>
      <div style={{ backgroundColor: "black" }}>

      </div>
      <div className="outerContainer">
        <div className="container">
          <InfoBar />
          <Messages messages={messages} />
        </div>
      </div>
    </div>

  );
}