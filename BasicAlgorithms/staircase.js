// function staircase(n){
//   for (let i = n; i > 0; i--){
//     let emptySpace = " ";
//     let b = 1;
//     let z;
//     while(b < i){
//       emptySpace += " ";
//       b++;
//     }
//     z = n-(b-1);
//     for (let i = 0; i<z; i++){
//       emptySpace += "#";
//     }
//     console.log(emptySpace);
//   }  
// }	

staircase(6);


//better solution
function staircase(n) {
  var line = Array(n).fill(' ');//creates new array and fills it in with empty spaces
  for (var i = n - 1; i >= 0; i--) {
      line[i] = '#';
      console.log(line.join(''));
  }
}