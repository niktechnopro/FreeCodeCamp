var fizzBuzz = function (){
  for (let i =1; i<=100; i++){
	if(i % 3 === 0) console.log('fizz');
	else if(i % 7 === 0) console.log('buzz');
	else console.log(i);
  }
}();