function chunkArrayInGroups(arr, size) {
  // Break it up.\
  let finalArr = [];
  let temp;
  while(arr.length >= size){
    temp = arr.splice(0,size);
    finalArr.push(temp);
  }
  if (arr.length){
    finalArr.push(arr);
  }
  return finalArr;
}

// chunkArrayInGroups(["a", "b", "c", "d"], 2);
console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4));// should return [[0, 1, 2, 3], [4, 5]]


// second option
// function chunkArrayInGroups(arr, size) {
//   var newArr = [];
//   while (arr.length) {
//     newArr.push(arr.splice(0,size));
//   }
//   return newArr;
// }

// chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4);