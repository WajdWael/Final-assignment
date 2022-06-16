// theme
document.body.addEventListener("change", function (e) {
    let target = e.target;
    wrapperElement = document.body.querySelector(".calc__container");
    switch (target.id) {
        case "first_toggle":
            wrapperElement.setAttribute("data-theme", "one");
            break;
        case "second_toggle":
            wrapperElement.setAttribute("data-theme", "two");
            break;
        case "third_toggle":
            wrapperElement.setAttribute("data-theme", "three");
            break;
    }
});

let currentNum = "";
let previousNum = "";
let operator = "";

const currentDisplayNumber = document.querySelector(".currentNumber");
const previousDisplayNumber = document.querySelector(".previousNumber");

window.addEventListener("keydown", handleKeyPress);
const equal = document.querySelector("#equal");
    equal.addEventListener("click", () => {
    if (currentNum != "" && previousNum != "") {
        compute();
    }
});

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
    addDecimal();
});

function addDecimal() {
    if (!currentNum.includes(".")) {
        currentNum += "0.";
        currentDisplayNumber.textContent = currentNum;
    }
}

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearCalculator);
function clearCalculator() {
    currentNum = "";
    previousNum = "";
    operator = "";
    currentDisplayNumber.textContent = "0";
    previousDisplayNumber.textContent = "";
}

const numberButtons = document.querySelectorAll("#number");
numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if (previousNum !== "" && currentNum !== "" && operator === "") {
        previousNum = "";
        currentDisplayNumber.textContent = currentNum;
    }
    if (currentNum.length <= 11) {
        currentNum += number;
        currentDisplayNumber.textContent = currentNum;
    }
}

const operators = document.querySelectorAll(".symbol-btn");
operators.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleOperator(e.target.textContent);
    });
});

function handleOperator(op) {
    if (previousNum === "") {
        previousNum = currentNum;
        operatorCheck(op);
    } else if (currentNum === "") {
        operatorCheck(op);
    } else {
        compute();
        operator = op;
        currentDisplayNumber.textContent = "0";
        previousDisplayNumber.textContent = previousNum + " " + operator;
    }
}

function operatorCheck(text) {
    operator = text;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNum = "";
}

function compute() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    switch (operator) {
        case "+":
            previousNum += currentNum
            break
        case "-":
            previousNum -= currentNum
            break
        case "×":
            previousNum *= currentNum
            break
        case "÷":
            if (currentNum <= 0) {
                previousNum = "You can dived by 0!";
                displayResults();
                return;
            }
            previousNum /= currentNum
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResults();
}
function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}

function displayResults() {
    if (previousNum.length <= 11) {
        currentDisplayNumber.textContent = previousNum;
    } else {
        currentDisplayNumber.textContent = previousNum.slice(0, 11) + "...";
    }
    previousDisplayNumber.textContent = "";
    operator = "";
    currentNum = "";
}

function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (
        e.key === "Enter" ||
        (e.key === "=" && currentNum != "" && previousNum != "")
    ) {
        compute();
    }
    if (e.key === "+" || e.key === "-") {
        handleOperator(e.key);
    }
    if (e.key === "*") {
        handleOperator("x");
    }
    if (e.key === "/") {
        handleOperator("÷");
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
}

document.querySelector(".delete").addEventListener("click", handleDelete)
function handleDelete() {
    if (currentNum !== "") {
        currentNum = currentNum.slice(0, -1);
        currentDisplayNumber.textContent = currentNum;
        if (currentNum === "") {
        currentDisplayNumber.textContent = "0";
        }
    }
    if (currentNum === "" && previousNum !== "" && operator === "") {
        previousNum = previousNum.slice(0, -1);
        currentDisplayNumber.textContent = previousNum;
    }
}


// keys.addEventListener('click', event => {
//     if (!event.target.closest('button')) return
//     const key = event.target
//     const keyValue = key.textContent
//     const displayValue = display.textContent
//     const { type } = key.dataset
//     const { previousKeyType } = calculator.dataset
//     if (type === 'number') {
//         if ((displayValue === '0') || (previousKeyType === 'operator')) {
//             display.textContent = keyValue
//             return
//         } else {
//             display.textContent = displayValue + keyValue
//         }
//     }

//     if (type === 'operator') {
//         if ((displayValue.includes("+")) || (displayValue.includes("-")) || (displayValue.includes("÷")) || (displayValue.includes("×"))) return;
//         operatorKeys.forEach(el => { el.dataset.state = '' })
//         calculator.dataset.firstNumber = displayValue
//         calculator.dataset.operator = key.dataset.key
//         display.textContent += key.dataset.key
//     }

//     if (type === 'equal') {
//         const firstNumber = calculator.dataset.firstNumber
//         const operator = calculator.dataset.operator
//         const secondNumber = displayValue
//         display.textContent = calculate(firstNumber, operator, secondNumber)
//     }

//     if (type === 'clear') {
//         display.textContent = '0'
//         delete calculator.dataset.firstNumber
//         delete calculator.dataset.operator
//     }

//     if (type === 'delete') {
//         display.textContent = display.textContent.toString().slice(0, -1)
//     }

//     function addDecimal() {
//         if (!display.textContent.includes(".")) {
//             key.textContent += ".";
//             display.textContent = currentNum;
//         }
//     }
    
//     const decimal = document.querySelector(".decimal");
//     decimal.addEventListener("click", () => {
//         addDecimal();
//     });

//     calculator.dataset.previousKeyType = type
// })

// function calculate(firstNumber, operator, secondNumber) {
//     let computation
//     firstNumber = parseFloat(firstNumber)
//     secondNumber = parseFloat(secondNumber)

//     if (isNaN(firstNumber) || isNaN(secondNumber)) {
//         document.querySelector('.error').classList.add("show-error")
//         setTimeout(() => {
//             document.querySelector('.error').classList.remove("show-error")
//         }, 2000);
//         return
//     }
//     switch (operator) {
//         case '+':
//             computation = firstNumber + secondNumber
//         break
//         case '-':
//             computation = firstNumber - secondNumber
//         break
//         case '×':
//             computation = firstNumber * secondNumber
//         break
//         case '÷':
//             computation = firstNumber / secondNumber
//             break
//         default:
//             return
//     }
//     return computation.toFixed(4)
// }

// document.onkeydown = function (event) {
//     // let key_press = String.fromCharCode(event.keyCode);
//     let key_code = event.keyCode;
//     let input = document.querySelector('.sc');
//     // let inputVal = input.innerHTML;
//     // let btnVal = this.innerHTML;
//     // let lastChar = inputVal[inputVal.length - 1];
//     // let operators = ['+', '-', '×', '÷'];
//     // let equation = inputVal;
//     // let check = inputVal != '' && operators.indexOf(lastChar) == -1;

//     if(key_code==8 || key_code==46) {
//         input.innerHTML = input.innerHTML.toString().slice(0, -1)
//         decimalAdded = false;
//     }
// }
