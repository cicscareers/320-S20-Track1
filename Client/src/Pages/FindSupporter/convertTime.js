  
export default function convertTime(value) {
    var hour=Math.floor(value/60);
    var minute=value%60;
    var timeSuffix="AM";
    if(hour>=12){
      timeSuffix="PM";
    }
    minute=(minute<10)?"0"+minute:minute
    hour=(hour-12>0)?hour-12:hour;
    return `${hour}:${minute} ${timeSuffix}`;
  }