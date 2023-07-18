import React from 'react'
import { useEffect,useState,useRef } from 'react';
import io from  "socket.io-client";
import GetServices from "../../Services/getServices";
import PostServices from "../../Services/postServices";
import img from "../../Images/avatar.png";
import inline from "../../Images/inline.PNG";
const moment=require("moment");
require("moment/locale/fr");
moment.locale('fr');

const socket=io.connect("http://localhost:3002");


function Message({user,id_vente}) {
    const room=id_vente;
    const[currentMessage,setcurrentMessage]=useState(null);
    const[messageList,setmessageList]=useState([]);
    const[onlineUsers,setOnlineUsers]=useState([]);
    const scroll=useRef();
  
    const sendMessage=()=>{
      if(currentMessage!==null){
        const id_sale=id_vente;
        const messenger={
            id_user:user.username,
            username:user.username,
            text:currentMessage,
            id_sale:id_sale,
            date:new Date(),
            room:room,
        }
        PostServices.addMessenger(messenger)
        .then((data2)=>{
          if(data2.add==true){
            setcurrentMessage("");
          }
        });
             
     socket.emit("send_message",messenger);
      setmessageList((list)=>[...list,messenger]);
      }
    }   
  useEffect(()=>{
    const id_user=user.username;
    const username=user.username;
    socket.emit("new-user",{id_user,username,room});
    socket.on("get-users",(users)=>{
        setOnlineUsers(users);
    })
    socket.emit("join_room",room);
     socket.on("receive_message",(data)=>{
        setmessageList((list)=>[...list,data]);
        const maxPrice=messageList.reduce((max,obj)=>Math.max(max,obj.id_user),messageList[0].id_user);
        

     });
  },[socket])
  useEffect(()=>{
    //get all prices
    GetServices.getMessenger(id_vente).then((response)=>{
        if(response.status===200){
            setmessageList(response.data);  
        }else{
            setmessageList([]);
        }	
    });
    
    
},[])
//allways sroll last message
useEffect(()=>{
  scroll.current?.scrollIntoView({behavior:"smooth"})
},[messageList])

  return (
    <div className='row'>
         <div className='col-md-4 border-end border-dar'>
         <div className='p-2 bg-dark text-light'> 
            <h4 className=''>Utilisateurs connectés:</h4>
        </div>
        <div className="p-2 overflow">
       
        <ul class="list-group list-group-flush">
                {onlineUsers.map((onlineUser)=>{return(
                                    <li class="list-group-item">
                                        {/* <span class="w3-left w3-tag w3-green w3-round">-</span> */}
                                        <img src={inline} alt="..." className="rounded me-1" style={{width:"10px" ,height:"10px"}} />
                                        <span class="w3-small">{onlineUser.username}</span>
                                    </li>
                    )}) }
            </ul>       
        </div>
        </div>
      
        <div className='col-md-8 '>
        <div className='p-2 bg-dark text-light'> 
            <h4 className=''>Message:</h4>
            <div className='chat-footer'>
            <div className="input-group">
                <textarea className='form-control' placeholder='Votre message...' value={currentMessage} onChange={(e)=>{setcurrentMessage(e.target.value)}} onKeyPress={(e)=>{
                e.key==="Enter" && sendMessage(); 
                }}/>
                <button className='btn btn-secondary' onClick={sendMessage}>&#9658;</button>
            </div>
             </div>
        </div>
             <div className='p-2 overflow'>
             <ul class="list-group list-group">

            {messageList.map((list)=>{
                return<li  ref={scroll} className="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                             <div class=""><img src={img} alt="..." class="w3-left w3-circle w3-margin-right" style={{width:"20px"}} />{list.username}</div>
                             <small className='text-muted'>{list.text}</small>
                       </div>
                     <span class="badge text-dark text-muted">{moment(list.date).fromNow()}</span>
                    </li>
            })

            }
            </ul>
        </div>
        </div>
       
      
    </div>
  )
}

export default Message
