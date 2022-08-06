const calculator = {
    displayValue: "0",
    operator: null,
    firstOperand: null,
    waitingSecondOperand: false
}

function updateDisplay() {
    const { displayValue } = calculator;
    const display = document.querySelector(".calcDisplay");
    display.value = displayValue;
}

const keys = addEventListener("click", (e) => {
    const { target } = e;
    if (!target.tagName === "BUTTON") {
        return;
    }
    if (target.classList.contains("numberKey")) {
        console.log("number", target.value)
        return;
    }
    if (target.classList.contains("operatorKey")) {
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
    console.dir(target);
})