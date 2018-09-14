//Return true if the string in the first element of the array contains all of the letters of the string in the second element of the array.


function mutation(arr) {
  let arrFirst = arr[0].toUpperCase();
  let second = arr[1].split('');
  let arrtrue = second.filter((value)=>{
    return arrFirst.includes(value.toUpperCase())
  })
  return arrtrue.length === second.length;
}

//mutation(["hello", "hey"]);
console.log(mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"])); //should return true.