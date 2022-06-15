// Modal ruels
const btnRules = document.querySelector(".game__body-rulesbtn");
const btnClose = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");

btnRules.addEventListener("click", () => {
    modal.classList.toggle('show-modal')
})
btnClose.addEventListener("click", () => {
    modal.classList.toggle('show-modal')
})


const SELECTIONS = [
    {
        name: "paper",
        beats: "rock",
    },
    {
        name: "scissors",
        beats: "paper",
    },
    {
        name: "rock",
        beats: "scissors",
    },
]


const SELECTIONSBTN = document.querySelectorAll(".game__body-btn-selection")
const GAME = document.querySelector(".game__body")
const RESULTS = document.querySelector(".game__body-results")
const RESULTSCONTAINER = document.querySelectorAll(".game__body-results_result")
const RESULTSWINNER = document.querySelector(".game__body-results_winner")
const RESULTSTEXT = document.querySelector(".game__body-results_text")
const PLAY_AGAIN_BTN = document.querySelector(".play-again")
const SCORENUM = document.querySelector(".score-container")
let score = 1;

SELECTIONSBTN.forEach(btn => {
    btn.addEventListener("click", () => {
        const SELECTIONVALUE = btn.dataset.selection;
        let SELECTION = SELECTIONS.find(selection => selection.name == SELECTIONVALUE)
        selections(SELECTION);
    })
})

function selections(selection) {
    const computerselection = computerSelection();
    displayResults([selection, computerselection])
    displayWinner([selection, computerselection])
}

function computerSelection() {
    const RANDOM = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[RANDOM];
}

function displayResults(results) {
    RESULTSCONTAINER.forEach((resultsDiv, i) => {
        setTimeout(() => {
            resultsDiv.innerHTML = `
                <section class="game__body-selection ${results[i].name}">
                    <img src="images/icon-${results[i].name}.svg" alt="${results[i].name}" />
                </section>
            `

        }, i * 1000) /*1000ms==1s*/ 
    })

    GAME.classList.toggle("hidden")
    RESULTS.classList.toggle("hidden")
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = winner(results)
        const computerWins = winner(results.reverse()) // to pass the computer selection first!
        
        if (userWins) {
            RESULTSTEXT.innerHTML = "you win"
            RESULTSCONTAINER[0].classList.toggle('winner-shadow')
            // if (/score == 0) {
            //     scoreTracker(1)
            // } else {
            //     scoreTracker(1)
            // }
            scoreTracker(1)
        } else if (computerWins) {
            RESULTSTEXT.innerHTML = "you lose"
            RESULTSCONTAINER[1].classList.toggle('winner-shadow')
            if (score == 0) {
                scoreTracker(0)
            } else {
                scoreTracker(-1)
            }
        } else {
            RESULTSTEXT.innerHTML = "it's a draw"
        }
        RESULTSWINNER.classList.toggle('hidden')
        RESULTS.classList.toggle('show-winner')
    }, 1000) /*1000ms==1s*/
}

function winner(results) {
    // compare the selections from the array
    // the beats with the name
    return results[0].beats == results[1].name;
}

function scoreTracker(point) {
    score += point;
    SCORENUM.innerHTML = score
}

PLAY_AGAIN_BTN.addEventListener("click", () => {
    GAME.classList.toggle('hidden')
    RESULTS.classList.toggle('hidden')

    RESULTSCONTAINER.forEach(div => {
        div.innerHTML = ""
        div.classList.remove('winner-shadow')
    })
    RESULTSTEXT.innerHTML = ""
    RESULTSWINNER.classList.toggle("hidden")
    RESULTS.classList.toggle('show-winner')
})

