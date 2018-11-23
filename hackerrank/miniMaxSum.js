//Given five positive integers, find the minimum and maximum values that can be calculated by summing exactly four of the five integers. Then print the respective minimum and maximum values as a single line of two space-separated long integers.

function miniMaxSum(arr) {
console.log(arr);
let min = null;
let max = null;
  let sorted = arr.sort((a,b)=>a-b);
  for (let i = 0; i<arr.length; i++){
    if (i != 0){
      max += arr[i];
    }
    if (i != arr.length-1){
      min += arr[i]
    }
  }
  return ({
    min,
    max
  })
}


let testArray = [1,3,2,4,5]

console.log(miniMaxSum(testArray));