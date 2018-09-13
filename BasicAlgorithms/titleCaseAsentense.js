//first version
function titleCase(str) {
  //let's split this into elements of an array
  let arr = str.toLowerCase().split(' ');
  //temp string
  let newStringArray = [];
  //loop through the array
  for (let i=0; i<arr.length; i++){
    let newCapital = arr[i].charAt(0).toUpperCase()+arr[i].substr(1);
    newStringArray.push(newCapital);
  }
  // console.log(newStringArray.join(' '));
  return newStringArray.join(' ');
}

titleCase("I'm a little tea pot");


//second version
function titleCase(str) {
  //let's split this into elements of an array
  let arr = str.toLowerCase().split(' ');
  //temp string
  let newStringArray = arr.map((value)=>{
    return value.replace(value.charAt(0), value.charAt(0).toUpperCase());
  })
  return newStringArray.join(' ');
}

console.log(titleCase("I'm a little tea pot"));