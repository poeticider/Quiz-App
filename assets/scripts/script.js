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

    //timer in top left. Will default to 60 sec at start of quiz.
    let timeEl = document.getElementById("time");
    time = 60;


    const timeInterval = setInterval(function () {
        timeEl.textContent = time;
        time--;
        console.log(time)
        
        if (time == 0) {
            clearInterval(timeInterval); //stops interval method
            time.textContent = ''; //removes element
    
    
        }
    
    }, 1000);



    //count used to cycle through nested object questions
    let count = 0;

    let qCount = "q" + (count +1)
    //console.log(qCount)
    let qTitleContent = questionsListObj[qCount];
    let choicesContent = answersListObj[qCount];
    //console.log(choicesContent)

    let questionsLength = Object.keys(choicesContent).length;
    console.log(Object.keys(choicesContent).length);
    
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


    addEventListener('click', function(e) {
        //event listener target #choices children buttons only
        if (e.target.tagName === 'BUTTON' && e.target.parentElement.id === 'choices') {
            //when a button is clicked, the count increments
            count++

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
                console.log("Quiz completed logic goes here");
                //this block should also trigger if time reaches zero
            }

        }

    });

}

