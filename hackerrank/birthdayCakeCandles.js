// Complete the birthdayCakeCandles function below.
function birthdayCakeCandles(ar) {
  //first we have to iterate throug array and choose the biggest numbers
  let initial = null;
  for (let i=0; i < ar.length; i++){
    if(initial < ar[i]){
      initial = ar[i]
    }
  }
  //next we have to check how many big numbers in array
  let count = ar.filter(value => value === initial)
  console.log(count.length)
}


let arr = [3, 2, 1, 3];
birthdayCakeCandles(arr);
