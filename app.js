let maxLength = 8;

const calculator = {
    displayValue: "0",
    operator: null,
    firstOperand: null,
    waitingSecondOperand: false
}

function updateDisplay() {
    const display = document.querySelector(".calcDisplay");
    const excessWrapper = document.querySelector("#excessWrapper");
    if (calculator.displayValue.length > 11) {
        excessWrapper.classList.remove("excessWrapperOff");
        excessWrapper.classList.add("excessWrapperOn");
    } else {
        excessWrapper.classList.add("excessWrapperOff");
        excessWrapper.classList.remove("excessWrapperOn");
        display.value = calculator.displayValue;
    }
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
}

function keyOperatorPress(key) {
    let { displayValue, operator, firstOperand } = calculator;
    const curValue = parseFloat(displayValue);
    if (firstOperand === null && !isNaN(curValue)) {
        calculator.firstOperand = curValue.toFixed(maxLength);
    } else if (operator) {
        const total = calculate(firstOperand, curValue, operator);
        calculator.displayValue = String(total.toFixed(maxLength));
        calculator.firstOperand = total;
    }
    calculator.operator = key;
    calculator.waitingSecondOperand = true;
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
        let newNum = calculate(firstOperand, curValue, operator);
        calculator.displayValue = newNum.toFixed(maxLength).toString();
        calculator.waitingSecondOperand = false;
        calculator.firstOperand = null;
        calculator.operator = null;
    }
}

function clearOut() {
    calculator.displayValue = "0";
    calculator.waitingSecondOperand = false;
    calculator.firstOperand = null;
    calculator.operator = null;
}

function percentageNum() {
    if (!isNaN(calculator.displayValue)) {
        let newNum = parseFloat(calculator.displayValue * .01);
        calculator.displayValue = newNum.toString();
    }
}

function negPos() {
    if (!isNaN(calculator.displayValue)) {
        let newNum = parseFloat(calculator.displayValue * -1);
        calculator.displayValue = newNum.toString();
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
        clearOut();
        updateDisplay();
        return;
    }
    if (target.classList.contains("equalKey")) {
        totalOut();
        updateDisplay()
        return;
    }
    if (target.classList.contains("percentKey")) {
        percentageNum();
        updateDisplay();
        return;
    }
    if (target.classList.contains("negPosKey")) {
        negPos();
        updateDisplay();
        return;
    }
    keyPress(target.value);
    updateDisplay();
});