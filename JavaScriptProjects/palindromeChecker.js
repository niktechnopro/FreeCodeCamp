function palindrome(str) {
  // Good luck!
  //let's sanitize the data
  let str1 = str.replace(/\s|[/:\(_).,-]/g,'');
  let newString = '';
  for (let i=str1.length-1; i>=0; i--){
    newString += str1[i]
  }
  if (str1.toLowerCase() === newString.toLowerCase()){
    return true
  }else{
    return false;
  }
}



console.log(palindrome("eye"));
// palindrome("_eye");// should return true.
// palindrome("race car");// should return true.
// palindrome("1 eye for of 1 eye.");// should return false.
// palindrome("0_0 (: /-\ :) 0-0");// should return true.
// palindrome("A man, a plan, a canal. Panama");// should return true.