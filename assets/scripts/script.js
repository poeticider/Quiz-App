//questions added as string values to obj
const questionsListObj = {
    q1:"Which of the following is NOT a sub-genre of fighting games?",

    q2:"Which of the following is NOT a fighting-game character archetype?"
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
    }
}






const quiz = () => {
    let startBtn = document.getElementById("start");
    startBtn.classList.add("hide");

    let questions = document.getElementById("questions");
    questions.classList.remove("hide");

    let questionTitle = document.getElementById("questionTitle");
    let choices = document.getElementById("choices");

    


    let count = 0;
    

    let answerKeys = Object.keys(answersListObj);
    //console.log(answerKeys[count])
    let qCount = "q" + (count +1)
    //console.log(qCount)
    let qTitleContent = questionsListObj[qCount];
    let choicesContent = answersListObj[qCount];
    //console.log(choicesContent)

    let questionsLength = Object.keys(choicesContent).length;
    //console.log(Object.keys(choicesContent).length);





    if (qCount == answerKeys[count]) {
        questionTitle.textContent = qTitleContent;

        for (let i=0; i < questionsLength; i++) {
            //var stores question keys
            let keys = Object.keys(choicesContent);
            //console.log(keys[i]);

            let newBtn = document.createElement("button");
            newBtn.textContent = keys[i];
            choices.appendChild(newBtn);
        
        }


        addEventListener('click', function(e) {
            //event listener target #choices children buttons only
            if (e.target.tagName === 'BUTTON' && e.target.parentElement.id === 'choices') {
                count++
                console.log(count);
                
            }
        });

    
    

    }
}

