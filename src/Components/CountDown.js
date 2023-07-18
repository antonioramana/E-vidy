import { useEffect } from "react";
import { useState } from "react";
const moment=require("moment");

const remain={
    seconds:()=>{
        return 0;
    },
 
    minutes:()=>{
        return  0;
    }
}
const CountDown=({debDate,minutes})=>{
   
    const endDate=moment(debDate).add(minutes,'minutes');
    const[remainingTime,setRemainingTime]=useState(remain);
    
    useEffect(()=>{
        
            var myInterval=setInterval(()=>{
                const now=moment(); 
                var remainingTimeTemp=moment.duration(endDate.diff(now));
                if(remainingTimeTemp.milliseconds()<0||remainingTimeTemp.seconds()<0||remainingTimeTemp.minutes()<0){
                    setRemainingTime(remain);
                    clearInterval(myInterval);
                }else{
                    setRemainingTime(moment.duration(endDate.diff(now)));
                } 
    
            },1000)
        
       
	},[])
    return (
        <div className="countdown">
            <div className="">
                <span className=""><span className="font-weight-bold border " style={{fontSize:"50px"}}>{remainingTime.minutes()}:{remainingTime.seconds()} </span></span> 
          </div>
        </div>
        );
}
export default CountDown;