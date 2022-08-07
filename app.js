const calculator = {
    displayValue: "0",
    operator: null,
    firstOperand: null,
    waitingSecondOperand: false
}

function updateDisplay() {
    const display = document.querySelector(".calcDisplay");
    display.value = calculator.displayValue;
}

function keyPress(key) {
    const { displayValue } = calculator;
    if (calculator.waitingSecondOperand === true) {
        calculator.displayValue = key;
        calculator.waitingSecondOperand = false;
    } else if (displayValue === "0") {
        calculator.displayValue = key;
    } else {
        calculator.displayValue = displayValue + key;
    }
    console.log(calculator);
}

function keyOperatorPress(key) {
    let { displayValue, operator, firstOperand } = calculator;
    const curValue = parseFloat(displayValue);
    if (firstOperand === null && !isNaN(curValue)) {
        calculator.firstOperand = curValue;
    } else if (operator) {
        const total = calculate(firstOperand, curValue, operator);
        calculator.displayValue = String(total);
        calculator.firstOperand = total;
    }
    calculator.operator = key;
    calculator.waitingSecondOperand = true;
    console.log(calculator);
}

function calculate(first, second, operator) {
    switch (operator) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            return first * second;
        case "/":
            return first / second;
        default:
            return second;

    }
}

function keyDecimal(key) {
    if (!calculator.displayValue.includes(".")) {
        calculator.displayValue = calculator.displayValue + key;
    }
}

function totalOut() {
    const { operator, firstOperand, displayValue } = calculator;
    const curValue = parseFloat(displayValue);
    if (operator) {
        calculator.displayValue = calculate(firstOperand, curValue, operator);
        calculator.waitingSecondOperand = false;
        calculator.firstOperand = null;
        calculator.operator = null;
    }
}

const keys = document.querySelector(".calcBodyKeys");
keys.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("BUTTON")) {
        return;
    }
    if (target.classList.contains("operatorKeys")) {
        keyOperatorPress(target.value);
        return;
    }
    if (target.classList.contains("decimalKey")) {
        keyDecimal(target.value);
        updateDisplay();
        console.log("decimal", target.value);
        return;
    }
    if (target.classList.contains("clearKey")) {
        console.log("all clear", target.value);
        return;
    }
    if (target.classList.contains("equalKey")) {
        totalOut();
        updateDisplay()
        return;
    }
    keyPress(target.value);
    updateDisplay();
});
