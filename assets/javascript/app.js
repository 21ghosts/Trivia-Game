// Variable List
var startScreen;
var gameHTML;
var counter = 30;
var questionArray = ["What is Black Panthers real name?", "What is Captain America's preferred weapon?", "Peter Parker works as a photographer for what company?", "Iceman is a member of what team?", "What is Mr. Fantastic's power?", "What is Scott Summers' X-Man alias?", "What is the name of Thor's hammer?", "One of the more iconic magicians in the Marvel universe, goes by he name of Doctor... ?"];
var answerArray = [["Icon", "Nick", "T'Challa", "Vergil"], ["Sword","Shield","Gun","Staff"], ["Daily Bugle", "New York Times", "Daily Planet", "Sports Illistrated"], ["Beatle Borgs","Defenders","X-Men","Power Rangers"], ["Super Strength", "Mind Reading", "telekinesis", "Plasticity"], ["Mjolnir","Laso of Truth","Sting","Reptar"], ["Unibeam", "Cyclops", "Biclops", "Unibrow"], ["Who","Curious","Weird","Strange"]];
var imageArray = ["<img class='center-block img-right' src='assets/images/blackPanther.png'>", "<img class='center-block img-right' src='assets/images/shield.jpg'>", "<img class='center-block img-right' src='assets/images/dailybugle.jpg'>", "<img class='center-block img-right' src='assets/images/xmen.jpg'>", "<img class='center-block img-right' src='assets/images/misterFantastic.jpg'>", "<img class='center-block img-right' src='assets/images/mjolnir.jpg'>", "<img class='center-block img-right' src='assets/images/cyclops.jpg'>", "<img class='center-block img-right' src='assets/images/strange.jpeg'>"];
var correctAnswers = ["C. T'Challa", "B. Shield", "A. Daily Bugle", "C. X-Men", "D. Plasticity", "A. Mjolnir", "B. Cyclops", "D. Strange"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("sound/button-click.mp3");

$(document).ready(function() {
    // Start button and initial screen
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  
        clickSound.play();
        generateHTML();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); 
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); 
    
    }); 
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 3000);  
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 3000);  
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }
    
  