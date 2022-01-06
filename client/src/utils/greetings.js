/**
 *
 * @param hour
 * @returns {string}
 */
export const greetings = () => {
  let hour =  new Date().getHours()
  if(hour < 8){
    return 'Good Night';
  }
  if(hour < 12){
    return 'Good Morning';
  }
  if(hour < 17){
    return 'Good Afternoon';
  }
  if(hour < 22){
    return 'Good Night';
  }
  return 'Good Night';
}