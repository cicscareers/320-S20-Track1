  
export default function convertTime(value) {
    var hour=Math.floor(value/60);
    var minute=value%60;
    if(hour<10){
        hour="0"+hour;
    }
    if(minute===0){
        minute="0"+minute
    }
    return `${hour}:${minute}`;
  }