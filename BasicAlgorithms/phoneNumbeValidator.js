function telephoneCheck(str) {
  let re1 = /\(([^)]+)\)/;//will check if both paranthesis present;
  let ps = str.match(re1);
  
  let parenthesis = () => {
    if ((str.includes('(') || str.includes(')')) && !ps){
      return false;
    }
    return true;
  }

  let cond1 = () => {
    if (str.includes('?') || (str.charAt(0) === '(' && str.charAt(str.length-1) === ')')){
      return false;
    }
    return true;
  }

  
  let re = /\d+/ig;
  let digits = str.match(re);
  let count = digits.join('');
  let condition = () => {
    if(count.length === 11 && count.charAt(0) == 1){
      return true;
    }
    return false;
  }
  if((count.length === 10 || condition()) && str.charAt(0) != '-' && parenthesis() && cond1()){
    return true;
  }
  return false;


}

//telephoneCheck("2555-555-5555");//should return true
//telephoneCheck("-1 (757) 622-7382");// should return false
//telephoneCheck("-555-(555)-5555");// should return false.
console.log(telephoneCheck("1 555-555-5555"));// should return true.