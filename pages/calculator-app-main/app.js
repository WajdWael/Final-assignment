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


const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calc__body-btn')
const display = calculator.querySelector('.sc')
const operatorKeys = keys.querySelectorAll('[data-type="operator"]')

keys.addEventListener('click', event => {
    if (!event.target.closest('button')) return
    const key = event.target
    const keyValue = key.textContent
    const displayValue = display.textContent
    const { type } = key.dataset
    const { previousKeyType } = calculator.dataset
    if (type === 'number') {
        if ((displayValue === '0') || (displayValue == '..') || (previousKeyType === 'operator')) {
            display.textContent = keyValue
            return
        } else {
            display.textContent = displayValue + keyValue
        }
    }

    if (type === 'operator') {
        if ((displayValue.includes("+")) || (displayValue.includes("-")) || (displayValue.includes("÷")) || (displayValue.includes("×"))) return;
        operatorKeys.forEach(el => { el.dataset.state = '' })
        calculator.dataset.firstNumber = displayValue
        calculator.dataset.operator = key.dataset.key
        display.textContent += key.dataset.key
    }

    if (type === 'equal') {
        const firstNumber = calculator.dataset.firstNumber
        const operator = calculator.dataset.operator
        const secondNumber = displayValue
        display.textContent = calculate(firstNumber, operator, secondNumber)
    }

    if (type === 'clear') {
        display.textContent = '0'
        delete calculator.dataset.firstNumber
        delete calculator.dataset.operator
    }

    if (type === 'delete') {
        display.textContent = display.textContent.toString().slice(0, -1)
    }

    calculator.dataset.previousKeyType = type
})

function calculate(firstNumber, operator, secondNumber) {
    let computation
    firstNumber = parseFloat(firstNumber)
    secondNumber = parseFloat(secondNumber)

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        document.querySelector('.error').classList.add("show-error")
        setTimeout(() => {
            document.querySelector('.error').classList.remove("show-error")
        }, 2000);
        return
    }
    switch (operator) {
        case '+':
            computation = firstNumber + secondNumber
        break
        case '-':
            computation = firstNumber - secondNumber
        break
        case '×':
            computation = firstNumber * secondNumber
        break
        case '÷':
            computation = firstNumber / secondNumber
            break
        default:
            return
    }
    return computation.toFixed(4)
}

document.onkeydown = function (event) {
    // let key_press = String.fromCharCode(event.keyCode);
    let key_code = event.keyCode;
    let input = document.querySelector('.sc');
    // let inputVal = input.innerHTML;
    // let btnVal = this.innerHTML;
    // let lastChar = inputVal[inputVal.length - 1];
    // let operators = ['+', '-', '×', '÷'];
    // let equation = inputVal;
    // let check = inputVal != '' && operators.indexOf(lastChar) == -1;

    if(key_code==8 || key_code==46) {
        input.innerHTML = input.innerHTML.toString().slice(0, -1)
        decimalAdded = false;
    }
}
