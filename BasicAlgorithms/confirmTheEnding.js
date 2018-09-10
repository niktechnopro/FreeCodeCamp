function confirmEnding(str, target){
  //let's split into array
  let splitted = str.split(' ');
  if (splitted.length > 1 && splitted[splitted.length -1] === target){
      return true
  }else{
    let ending = str.substr(str.length-target.length, str.length-1);//that would check the end
    if(ending === target){
      return true
    }
  }
  return false
}

// confirmEnding("Bastian", "n");
console.log(confirmEnding("Congratulation", "on"))// should return true.