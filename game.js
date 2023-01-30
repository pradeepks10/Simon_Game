// it stores the game patern
var gamePattern = [];
var userClickedPattern =[];
// array that contain colours of buttons
var buttonColours = ["red", "blue", "green", "yellow"];

  var level=0;

  //check if any key press,start the game
  $(document).keypress(function(){
      $("h1").text("Level 0");
     nextSequence();
  })





// fn to know user chosen colour and play sound corrospending to it
$(".btn").click(function(){

  //select the clicked colour
    var userChosenColour= $(this).attr("id");
 // store the clicked in array
      userClickedPattern.push(userChosenColour);
      checkAnswer(userClickedPattern.length-1);
//play correspong sound
      playSound(userChosenColour);
      animatePress(userChosenColour);
});


//fn to get random next colour and play sound
function nextSequence() {

  //set usser pattern empty for next level
   userClickedPattern =[];

//generate random number
  var randomNumber;
   randomNumber = Math.floor((Math.random() * 4));

//choose randam colour
var randomChosenColour = buttonColours[randomNumber];

// adding chosen colur to game pattern
gamePattern.push(randomChosenColour);

//take random chosen no and apply it fadeout,fadein;
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

//play sound
  playSound(randomChosenColour);
     level++;
    $("h1").text("Level "+level);
}

//fn for animation
function animatePress(currentColour){
  //add the animated css class
  $("."+currentColour).addClass("pressed");

  //create dealy and remove class
  setTimeout(function(){
      $("."+currentColour).removeClass("pressed");
  },100);


}

//it keep track of user clicked button
function checkAnswer(currentLevel){
     if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
         if(gamePattern.length==userClickedPattern.length){
           setTimeout(function(){
             nextSequence();
           },1000);
         }

     }
     else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over,Press Any Key to Restart");
        startOver();
     }

}

function startOver(){
   level=0;
   gamePattern=[];
}

function playSound(name){
  var audio = new Audio("sounds/" +name+ ".mp3");
      audio.play();
}
