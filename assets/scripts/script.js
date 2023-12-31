//-----------------------------------------DATA OBJECTS------------------------------------------------

//questions added as string values to obj
const questionsListObj = {
    q1:"Which of the following is NOT a sub-genre of fighting games?",

    q2:"Which of the following is NOT a fighting-game character archetype?",

    q3:"Which of the following is NOT a fighting-game?",

    q4:"Which of the following properties are NOT associated with a DP ('Dragon Punch')?",

    q5:"In Street Fighter, what is meant by a 'Shoto'?"
}


//answers added as nested obj
const answersListObj = {

    q1: {
        goreFighters: true,
        animeFighters: false,
        platformFighters: false,
        twoDFighters: false
    },

    q2: {
        zoner: false,
        gunner: true,
        puppet: false,
        trap: false
    },

    q3: {
        meltyBlood: false,
        bloodyRoar: false,
        happyChaos: true,
        footsies: false
    },

    q4: {
        overhead: true,
        invicibilityFrames: false,
        antiAir_invicibility: false,
        launcher: false,
    },

    q5: {
        character_playstyles_similar_to_Zangief: false,
        character_playstyles_similar_to_Dhalsim: false,
        character_playstyles_similar_to_Guile: false,
        character_playstyles_similar_to_Ryu: true
    }
}


//-------------------------------------------ON LOAD LOCAL STORAGE-----------------------------------------------

   


//------------------------------------------------LOGIC-----------------------------------------------



const quiz = () => {
    //removes start button at start of quiz
    let startBtn = document.getElementById("start");
    startBtn.classList.add("hide");

    //displays questions div at start of quiz
    let questions = document.getElementById("questions");
    questions.classList.remove("hide");

    //question and answer parents used for appending quiz objects
    let questionTitle = document.getElementById("questionTitle");
    let choices = document.getElementById("choices");

    //total player score.
    score = 0

    //timer in top left. Will default to 60 sec at start of quiz.
    let timeEl = document.getElementById("time");
    time = 60;


    const timeInterval = setInterval(function () {
        time--;
        timeEl.textContent = time;
        //console.log(time)
        
        if (time == 0) {
            clearInterval(timeInterval); //stops interval method
            timeEl.textContent = 0; 
            endQuiz();
    
    
        }
    
    }, 1000);



    //count used to cycle through nested object questions
    let count = 0;

    let qCount = "q" + (count +1)
    //console.log(qCount)
    let qTitleContent = questionsListObj[qCount];
    let choicesContent = answersListObj[qCount];
    //console.log(choicesContent)

//---------------------------------------NEXT QUESTION HTML LOGIC------------------------------------------------------------------

    let questionsLength = Object.keys(choicesContent).length;    
    //function to manipulate the dom to create a new set of question buttons. 
    //The nested objected is chosen based on the key (ie q1)
    const nextQuestion = () => {
        questionTitle.textContent = qTitleContent;
        //removes previous set of buttons
        choices.innerHTML = ""; 

        //stores keys for choicesContent as an array
        let keys = Object.keys(choicesContent);
        //console.log(keys)

        for (let i = 0; i < questionsLength; i++) {
            let newBtn = document.createElement("button");
            newBtn.textContent = keys[i];
            choices.appendChild(newBtn);
        }
    }

    //initial function call for first set of questions
    nextQuestion();

//---------------------------------------END QUIZ LOGIC-------------------------------------------------

    //end of quiz logic. To be used in timer + event listener for answer buttons
    const endQuiz = () => {
        //freezes timer
        clearInterval(timeInterval);
        //hides questions + answers
        questions.classList.add("hide");
        //displays endScreen
        let endScreenEl = document.getElementById("end-screen");
        endScreenEl.classList.remove("hide");

        

        //score is worked as 20pt per question + half the remaining time as points
        time = Math.floor(time / 2);
        score += time;
        //console.log("time:" + time)
        // console.log("score:" + score)
        // console.log(`final score is ${score}`)

        let finalScoreEl = document.getElementById("final-score");
        finalScoreEl.textContent = score;

        let submitEl = document.getElementById("submit");

        //LEVELLING UP MY EVENTLISTENER GAME. LET'S GOOOO!
        addEventListener('click', function(e) {
            if(e.target.id == "submit") {
                console.log("target aquired");

                //ADD LOCAL STORAGE LOGIC HERE
                let initialsEl = document.getElementById("initials");

                if(initialsEl.value == "") {
                    this.alert("Error: please enter your name.");

                } else {
                    
                    localStorage.setItem(initialsEl.value, score);
                    console.log(initialsEl.value)
                    window.location.replace('../highscores.html');

                    // this.localStorage.getItem(savedInitials)
                    // let newLi = this.document.createElement("li");

                    // newLi.textContent = savedInitials;

                    // let highscoresEl = this.document.getElementById("highscores").appendChild("newLi");
                    
                }
                
            }

        });
    }
    


//--------------------------------ANSWER BTNS EVENT LISTENER LOGIC---------------------------------------

    addEventListener('click', function(e) {
        //event listener target #choices children buttons only
        if (e.target.tagName === 'BUTTON' && e.target.parentElement.id === 'choices') {
            //when a button is clicked, the count increments
            count++

            //stores target button as var
            let clickedAnswer = e.target.textContent;
            //as choicesContent displays nested objects this can be used with clickedAnswer to check values
            console.log(choicesContent[clickedAnswer])

            //if answer is correct 10 points is added to score
            if (choicesContent[clickedAnswer] == true) {
                score += 20;

            //if answer is incorrect 5 seconds is deducted from time remaining
            } else if (choicesContent[clickedAnswer] == false) {
                time -=5;
            }
            
            
                
            
            
            //converts object into array of keys. this is done because .length will return undefined on an object
            let answerKeys = Object.keys(answersListObj);

            //permitted the count is less than the amount of questions...
            if (count < answerKeys.length) {
                //...content values is updated using qCount...
                qCount = "q" + (count + 1);
                qTitleContent = questionsListObj[qCount];
                choicesContent = answersListObj[qCount];
                questionsLength = Object.keys(choicesContent).length;

                //...and nextQuestion is called to update the html
                nextQuestion();

            } else {
                //once count reaches answerKeys length, quiz will end
                endQuiz();
                //this block should also trigger if time reaches zero
            }

        }

    });

}

