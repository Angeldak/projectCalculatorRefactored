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
        const total = calculate(firstOperand, displayValue, operator);
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

const keys = document.querySelector(".calcBodyKeys");
keys.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("BUTTON")) {
        return;
    }
    if (target.classList.contains("operatorKeys")) {
        keyOperatorPress(target.value);
        console.log("operator", target.value);
        return;
    }
    if (target.classList.contains("decimalKey")) {
        console.log("decimal", target.value);
        return;
    }
    if (target.classList.contains("clearKey")) {
        console.log("all clear", target.value);
        return;
    }
    if (target.classList.contains("equalKey")) {
        console.log("equals", target.value);
        return;
    }
    keyPress(target.value);
    updateDisplay();
});
