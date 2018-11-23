// var fizzBuzz = function (){
//   for (let i =1; i<=100; i++){
//   	if (i%3 === 0 && i%7 ===0) console.log('fizzbuzz')
// 	else if(i % 3 === 0) console.log('fizz');
// 	else if(i % 7 === 0) console.log('buzz');
// 	else console.log(i);
//   }
// }();



//another better version
var fizzBuzz = function (){
  for (let i =1; i<=100; i++){
    let str = ''
    if(i % 3 === 0) str += 'fizz';
    if(i % 7 === 0) str += 'buzz';
    if(str === '') str += i;
    console.log(str);
  }
}();