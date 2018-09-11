function truncateString(str, num) {
  // Clear out that junk in your trunk
  let newStr = '';
  let ending = '...';
  if(str.length<=num){
    newStr = str.slice(0,num);
  }else{
    newStr = str.slice(0,num)+ending;
  }
  console.log(newStr);
  return newStr;
}

// truncateString("A-tisket a-tasket A green and yellow basket", 8);//should return "A-tisket...".
// truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length);// should return "A-tisket a-tasket A green and yellow basket".
truncateString("A-tisket a-tasket A green and yellow basket", "A-tisket a-tasket A green and yellow basket".length + 2);// should return "A-tisket a-tasket A green and yellow basket".