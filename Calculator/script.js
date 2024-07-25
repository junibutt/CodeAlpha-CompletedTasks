let displayValue = '0';
let operator = '';
let firstOperand = null;
let waitingForSecondOperand = false;

const display = document.getElementById('display');

function appendToDisplay(value) {
    if (waitingForSecondOperand) {
        displayValue = value;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? value : displayValue + value;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== '' && !waitingForSecondOperand) {
        calculate();
    }
    firstOperand = parseFloat(displayValue);
    operator = op;
    waitingForSecondOperand = true;
}

function appendDecimal() {
    if (waitingForSecondOperand) return;
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    operator = '';
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function deleteLast() {
    if (displayValue.length === 1) {
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    const secondOperand = parseFloat(displayValue);
    let result = 0;
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    displayValue = result.toString();
    firstOperand = result;
    operator = '';
    waitingForSecondOperand = true;
    updateDisplay();
}

function updateDisplay() {
    display.value = displayValue;
}
