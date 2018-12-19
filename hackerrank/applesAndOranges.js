function countApplesAndOranges(s, t, a, b, apples, oranges) {
  let left = [];
  let right = [];
  //console.log(distFromApple, distFromOrange);
  //for apples we are only interested in positives from array
  for (let i=0; i<apples.length; i++){
    if (apples[i]>0 && (apples[i]+a) >= s && (apples[i]+a)<= t){
      left.push(i);
    }
  }
  //for oranges we are only interested in negative numbers
  for (let i=0; i<oranges.length; i++){
    if (oranges[i]<0 && (oranges[i]+b) <= t && (oranges[i]+b) >= s){
      right.push(i);
    }
  }
  //console.log('indexes', left, right);
  console.log(left.length,right.length);
  return {"apples": left.length, "oranges": right.length};
}


//console.log(countApplesAndOranges(7, 11, 5, 15, [-2, 2, 1], [5, -6]));
console.log(countApplesAndOranges(2, 3, 1, 5, [-2], [-1]));

// 2 3
// 1 5
// 1 1
// 2
// -2

// 2 3
// 1 5
// 1 1
// -2
// -1

// 7 11
// 5 15
// 3 2
// -2 2 1
// 5 -6