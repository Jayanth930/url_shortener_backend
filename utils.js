import url from "url"
export const  isValidUrl = (actual_url)=>{
    const urlObj = url.parse(actual_url)
    const { hostname , protocol , path} = urlObj
    if(protocol!=null && protocol != 'https:' && protocol != 'http:') return false;
    if(hostname==null) return false;
    return true
}


export const getTimes = (expiresIn)=>{
    
    const currentTime = new Date();
    if(expiresIn === undefined || expiresIn === "") return { currentTime , expirationTime :  new Date('5000-06-12')}
    const [daysStr, hoursStr, minutesStr, secondsStr] = expiresIn.split(' ');
    
    const days = parseInt(daysStr) || 0 ;
    const hours = parseInt(hoursStr) || 0;
    const minutes = parseInt(minutesStr) || 0;
    const seconds = parseInt(secondsStr) || 0;
    
    const expirationTime = new Date(currentTime);

    
   
    expirationTime.setDate(currentTime.getDate() + days); // Add days
    expirationTime.setHours(currentTime.getHours() + hours); // Add hours
    expirationTime.setMinutes(currentTime.getMinutes() + minutes); // Add minutes
    expirationTime.setSeconds(currentTime.getSeconds() + seconds); // Add seconds

    
    return {currentTime , expirationTime}

}