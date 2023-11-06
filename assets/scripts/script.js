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
    
    for(let i=0; i<questionsListObj; i++) {
        console.log(`${i}`);
    }
}

