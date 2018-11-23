// 0, 1, 1, 2, 3, 5, 8, 13... 
// considering that first number=0, second=1, 
// third=1, fourth=2, fifth=3, etc...


var fib = function(n) {
  //so a=0, b=1; and current is an element we are interested in
  var first = 0, second = 1, current;
  if (n < 0) current = "must be >0";
  else if(n == 1) current = 0;
  else if(n <= 2) current = 1;
  else{
    for (let i = 3; i<=n; i++){
      current = first + second; // the next number in sequence is a sum of 2 previous numbers
      first = second;
      second = current;
    }
  }
  return current;
};

console.log(fib(5)); //fifth element should return 3




