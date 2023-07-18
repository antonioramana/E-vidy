import React from 'react'
import { useRef } from 'react';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import io from  "socket.io-client";
import GetServices from "../../Services/getServices";
import PostServices from "../../Services/postServices";

const moment=require("moment");
const socket=io.connect("http://localhost:3002");


function Price({user,vente}) {
  const debDate=vente[0].date;
  const minutes=vente[0].duration;
  const id_vente=vente[0].id_sale;
    const[currentPrice,setcurrentPrice]=useState(null);
    const[priceList,setpriceList]=useState([]);
    const[room,setRoom]=useState(id_vente);
    const[priceMax,setPriceMax]=useState();
    const endDate=moment(debDate).add(minutes,'minutes');
    const[showInput,setShowInput]=useState(false);
    const scroll=useRef();
  
    const sendPrice=()=>{
      if(currentPrice!==null && currentPrice>=vente[0].initial_price){
        const username=user.username;
        const id_sale=id_vente;
        const userPrice={
            username:username,
            price:currentPrice,
            id_sale:id_sale,
            room:room,
        }
        PostServices.addPrice(userPrice)
        .then((data2)=>{
          if(data2.add==true){
           // setSuccessMessage("Envoyé");
            setcurrentPrice("");
          }else if(data2.add==false){
            //setErrorMessage("Non envoyé");
          }
        });
             
     socket.emit("send_price",userPrice);
    setpriceList((list)=>[...list,userPrice]);
      }
    }   
  useEffect(()=>{
    socket.emit("join_room",room);
     socket.on("receive_price",(data)=>{
        setpriceList((list)=>[...list,data]);
        const maxPrice=priceList.reduce((max,obj)=>Math.max(max,obj.price),priceList[0].price);
        

     });
  },[socket])
  useEffect(()=>{
    //get all prices
    GetServices.getPrice(id_vente).then((response)=>{
        if(response.status===200){
            setpriceList(response.data);  
        }else{
            setpriceList([]);
        }	
    });
    
    
},[])
useEffect(()=>{
    if(priceList.length>0){
        const maxPrice=priceList.reduce((max,obj)=>Math.max(max,obj.price),priceList[0].price);
        setPriceMax(maxPrice);
    }
   
},[priceList])

useEffect(()=>{
   
  var myInterval=setInterval(()=>{
   if(moment().isBetween(debDate,endDate)){
     setShowInput(true);
    }
   else{
     setShowInput(false);
    }
  },1)
 },[])
//allways sroll last price
useEffect(()=>{
  scroll.current?.scrollIntoView({behavior:"smooth"})
},[priceList])
  return (
    <div>
        <div className='chat-header'>
        <div className='p-2 bg-dark text-light'> <h4 className=''>Prix de la vente:</h4>
            <div className='chat-footer'>
           {showInput && <div className="input-group">
            <input type="number" min={vente[0].initial_price} className="form-control" placeholder={'Minumium '+vente[0].initial_price+" AR"} value={currentPrice} onChange={(e)=>{setcurrentPrice(e.target.value)}} onKeyPress={(e)=>{
              e.key==="Enter" && sendPrice(); 
            }}/>
          <button className='btn btn-dark' onClick={sendPrice}>&#9658;</button>
            </div>}
        </div>
        </div>
        </div>
       

        <div className='p-2 overflow'>
        <ol class="list-group list-group-numbered">
            {priceList.map((list)=>{
                return<li ref={scroll} className={list.price==priceMax?"bg-info list-group-item d-flex justify-content-between align-items-start":"list-group-item d-flex justify-content-between align-items-start"}>
                  <div class="ms-2 me-auto">
                   <div class="fw-bold">{list.username}</div>
                </div>
                   {list.price==priceMax?(<span className="badge bg-secondary rounded-pill"> {list.price} AR</span>):( <div>{list.price} AR</div>)}
                    </li>
            })

            }
         </ol>   
        </div>
      
    </div>
  )
}

export default Price
