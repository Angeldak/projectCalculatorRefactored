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
    let { displayValue } = calculator;
    if (displayValue === "0") {
        calculator.displayValue = key;
    } else {
        calculator.displayValue = displayValue + key;
    }
}

const keys = document.querySelector(".calcBodyKeys");
keys.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("BUTTON")) {
        return;
    }
    if (target.classList.contains("operatorKeys")) {
        console.log("operator", target.value)
        return;
    }
    if (target.classList.contains("decimalKey")) {
        console.log("decimal", target.value)
        return;
    }
    if (target.classList.contains("clearKey")) {
        console.log("all clear", target.value)
        return;
    }
    if (target.classList.contains("equalKey")) {
        console.log("equals", target.value)
        return;
    }
    keyPress(target.value);
    updateDisplay();
});
