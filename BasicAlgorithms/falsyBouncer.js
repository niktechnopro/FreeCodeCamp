// first version

function bouncer(arr) {
  // Don't show a false ID to this bouncer.
  //let's define what is falsy here
  let falsy = ['', ' ', false, null, NaN, undefined, 0];
  let arr2 = arr.filter((value)=>{
    return !falsy.includes(value);
  })
  return arr2;
}

console.log(bouncer([7, "ate", "", false, 9]));


//second version
// function bouncer(arr) {
//   // Don't show a false ID to this bouncer.
//   //let's define what is falsy here
//   let falsy = ['', ' ', false, null, NaN, undefined, 0];
//   let arr2 = [];
//   for (let i=0; i<arr.length; i++){
//     if(!falsy.includes(arr[i])){
//       arr2.push(arr[i])
//     }
//   }
//   return arr2;
// }

// console.log(bouncer([7, "ate", "", false, 9]));