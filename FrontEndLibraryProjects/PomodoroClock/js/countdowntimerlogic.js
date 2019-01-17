
console.log("script loaded")
//setting up global variables
var timerSpeed = 1000; //1s
var workLength = 25;
var playLength = 5;
// var alarm = new Audio('http://www.orangefreesounds.com/wp-content/uploads/2016/06/Ringing-clock.mp3?_=1');
var beep = new Audio('sound/timesup.mp3')
var isPaused = false;
var loop = 0;
var longRest = 1;
var longBreak = 30;
var jokeInt; // global variable for jokes so we can reset timer from other function
var sliderWait = false;
var countInt;
var flag = false;//to prevent start with demo button
 //need it to slow down process for sliding instructions
//end of setting up global variables
var tempMinutes;
var tempSeconds;


//that was a test button for flipping screen
// $(".pause").click(function(){          
//     $(".flipper").toggleClass("flip");
// });

//to start
$('.start').click(()=>{
  flag = true;
  startTimer();
  $('.start').unbind();//remove start listener, so the time would not start
})

//to reset

$('.reset').click(()=>{
  flag=false;
  reset();
  $('.start').on("click", ()=>{//put the listener back
      flag=true;
     startTimer();
     $('.start').unbind();
  });
})


//pause
$('.pause').click(()=>{
  isPaused = true;
  flag=false;
  //we need to determing if this is long or short break
  let saveStr = $('#break-label').text();//to put back the right text
  $('#session-label').html("PAUSED");
  $('#break-label').html("PAUSED");
  $('.start').on("click", ()=>{
    $('#session-label').html("Work Session");
    $('#break-label').html(saveStr);
    isPaused = false;
  });
})

//to set workTime//
  $('#session-increment').click(function(){ //+
    workLength < 95 ? workLength += 5 : workLength = 95;
    $('.minutes').html(workLength);
    $('.workTimer').html(workLength);      
  });

  $('#session-decrement').click(function(){ //-
    (workLength < 10) ? workLength = 5 : workLength -= 5;
    $('.minutes').html((workLength < 10) ? ('0' + workLength) : workLength);
    $('.workTimer').html((workLength < 10) ? ('0' + workLength) : workLength);
  })


//to set playTime
  $('#break-increment').click(function(){//+
    (playLength < 95) ? playLength += 5 : playLength = 95;
    $('.playTimer').html(playLength);
  })


  //deduct playtime with ternary operator and logic to stay with 2 digits
  $('#break-decrement').click(function(){//-
    (playLength < 10) ? playLength = 5 : playLength -= 5;
    $('.playTimer').html((playLength > 5) ? playLength : ('0' + playLength));
  })  
//end of listeners for buttons plus and minus


////what you see above is for input manipulation////
function startTimer() {    //to start timer
  loop = 0;
  seconds = 0;
  countDown(workLength, seconds);
}

function reset() {//to reset timer
  $('#session-label').html("Work Session");
  $('#break-label').html("Break Length");
  $('#modal-wrapper').slideUp("slow");
  // console.log("reset was pressed",countInt)
  if(countInt || countInt > 0){clearInterval(countInt)}
  if(loop != 0){
    $(".flipper").toggleClass("flip");
    loop = 0;
  }
  workLength = 25;
  playLength = 5;
  longRest = 1;
  $('.minutes, .minutes-interval').html(workLength); //resets minutes and seconds on main timer and user input
  $('.seconds').html('00');
  $(".playTimer").html('0' + playLength); //ads 0 in front of 5
  $(".workTimer").html(workLength);
}

//demo - button
$('#demo-button').click(()=>{
  timerSpeed = (timerSpeed==1000) ? 10 : 1000;
  // console.log('timer speed', timerSpeed); 
  $('#demo-button').html(timerSpeed == 10 ? "Demo - timer speed 10ms" : "Normal - timer speed 1s");
  // console.log('flag', flag, countInt, tempMinutes, tempSeconds)
  if(tempMinutes!=undefined && tempSeconds!=undefined){
    // console.log('executed', tempMinutes, tempSeconds, countInt)
    clearInterval(countInt);//that will reset the timer
    if(flag = true){
      countDown(tempMinutes, tempSeconds);//only when start was pressed before
    }
    if(!isPaused){
      $('.start').unbind();//remove start listener, so the time would not start
    }
  };
})

function getJoke(){
    console.log('joke is being called')
// var url = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback="
    var url='https://api.icndb.com/jokes/random?exclude=[explicit]'
    $.getJSON(url, function(result) {
        $("#joke").html(result.value.joke);
    });
    jokeInt = setTimeout(getJoke, 15000); //timer to call new joke every 15 sec
}


function countDown(minutes,seconds) { 
 countInt = setInterval(function(){
    if (minutes == 0 && seconds == 0) { //since minutes are not '0' it skips directly to the timer
        clearInterval(countInt);        
        if (loop == 0) {
            if (longRest % 4 != 0 || longRest == 1){//this checks if this is short break or long break
              time = playLength;
              //console.log('keeping short break')
            }else{
              time = longBreak //long break
              //console.log("keeping long break")//we are going to use this as a trigger
            } 
              if (time < 10){
                  $("#playTimer").html('0' + time);//adjusting to 2 digits
                }else{
                  $("#playTimer").html(time); //updating play time in initial input field
              }
            if (time == longBreak){ // scretch it - unused part
                //console.log('calling long break')
                getJoke();//we can use this trigger for joke
                $('#modal-wrapper').slideDown("fast");
                // $('#modal-wrapper').show("slide", { direction: "down" }, 500);
            }else{
                //console.log('clearing joke interval')
                clearInterval(jokeInt);
            }
            loop += 1;
            if (time == longBreak){
              $('#break-label').html('Long Break');
            }else{
              $('#break-label').html('Short Break');
            };
            $(".flipper").toggleClass("flip");
        } else {
            if (time == longBreak && loop == 1){ //when break is over we need to remove modal
              // $("#playTimer").html('0'+playLength);
              clearInterval(jokeInt);
              $('#modal-wrapper').slideUp("slow");
              // $('#modal-wrapper').hide("slide", { direction: "up" }, 500);
            }
            time = workLength;
            longRest += 1;
            loop -= 1;
            $(".flipper").toggleClass("flip");
        }
          beep.play();
          $('#tomato').effect( "bounce", { times: 3 }, "slow" );  
          countDown(time, 0); // timer, recursive call
      } else if ((seconds != 0 || seconds > 0) && !isPaused) {
          seconds -= 1;
      } else if (seconds == 0 && !isPaused) {
          seconds = 59;
          minutes -= 1;
      }
      var formattedMinutes = ("0" + minutes).slice(-2);//format m and s to take 2 digits
      var formattedSeconds = ("0" + seconds).slice(-2); 
      tempMinutes = formattedMinutes;
      tempSeconds = formattedSeconds;
      $('.minutes').html(formattedMinutes);
      $('.seconds').html(formattedSeconds);
        
    }, timerSpeed);
}   
 

