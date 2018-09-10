function largestOfFour(arr) {
  let newArray = [];
  //let's iterate through this array
  for (let i=0; i<arr.length; i++){
    let biggest = arr[i][0];
    for (let z=0; z<arr[i].length; z++){
      if(arr[i][z]>biggest){
        biggest = arr[i][z];
      }
    }
    newArray.push(biggest);
  }
  if(newArray.length === arr.length){
    console.log(newArray);
    return newArray;
  }
}

largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);