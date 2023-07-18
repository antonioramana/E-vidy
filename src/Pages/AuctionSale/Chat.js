import React from 'react'
import { useState, useEffect } from 'react';
import CountDown from '../../Components/CountDown';
import Message from './Message';
import Price from './Price';

const moment=require("moment");

function Chat({user,id_vente,minutes,debDate,vente}){

  const endDate=moment(debDate).add(minutes,'minutes');
  const[showChrono,setShowChrono]=useState(false);
  const[information,setInformation]=useState("");
 
  
  useEffect(()=>{
   
   var myInterval=setInterval(()=>{
    if(moment().isBetween(debDate,endDate)){
      setShowChrono(true);
      setInformation("Vente en cours...");
     // clearInterval(myInterval);
    }else if(moment().isAfter(endDate)){
      setShowChrono(false);
      setInformation("Vente terminée ...");
      clearInterval(myInterval);
     
    } 
    else if(moment().isBefore(endDate)){
      setShowChrono(false);
      setInformation("Vente en attente ...")
    }
   },1)
  },[])
 

  return (
    <div className='row'>

       {showChrono  && <CountDown debDate={debDate} minutes={minutes}/> }
      <div className='col-md-8 '>
        <Message user={user} id_vente={id_vente}/>
      </div>
      <div className='col-md-4 border-start'>
      <Price user={user} vente={vente}/>
      <div className='text-center my-5 alert alert-info'>{information}</div>
      </div>
    </div>
  )
}

export default Chat
