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


document.addEventListener("click", function(event){
	let submit = document.getElementById("submit");
    quiz();
});

const quiz = () => {
    let questions = document.getElementById("questions");
    questions.classList.remove("hide");

    let questionTitle = document.getElementById("questionTitle");
    let choices = document.getElementById("choices");

    
    let questionsListObjLength = Object.keys(questionsListObj).length;

    let count = 0;
    let answerKeys = Object.keys(answersListObj);
    //console.log(answerKeys[count])
    let qCount = "q" + (count +1)
    //console.log(qCount)
    let qTitle = questionsListObj[qCount];

    if (qCount == answerKeys[count]) {
        questionTitle.textContent = qTitle;
        //console.log("q is equal to qCount from the obj");
        
        console.log(qTitle)
    }
}

