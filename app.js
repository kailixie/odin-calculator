let numOne = "";
let operandOne = "";
let numTwo = "";
let operandTwo = "";
let operator = null;
let result = "";

const screen = document.getElementById("screen")
const numKeys = document.querySelectorAll(".numKeys");
const operateKeys = document.querySelectorAll(".operateKeys")
const clearKey = document.getElementById('clear');
const enterKey = document.getElementById('enter');
const decimalKey = document.getElementById('decimal');
const deleteKey = document.getElementById('delete');

// Create buttons for all numbers, functions, and equals key

numKeys.forEach(numKey => numKey.addEventListener("click", () => {appendEntry(numKey.value)}));
deleteKey.addEventListener("click", back);
operateKeys.forEach(operateKey => operateKey.addEventListener("click", () => {appendOperator(operateKey.value)}));
decimalKey.addEventListener("click", addDecimal);
enterKey.addEventListener("click", () => solve(operandOne, numTwo, operator));
clearKey.addEventListener("click", clear);


// Create calculator display

// Functions to display when numbers are clicked

window.addEventListener("keyup", handleInput)

function handleInput(e) {
    if (e.key >= 0 && e.key <= 9) appendEntry(e.key);
    else if (e.key === "c") clear();
    else if (e.key === "Backspace") back();
    else if (e.key === "/" || e.key === "+" || e.key === "*" || e.key === "-" || e.key === "^") appendOperator(e.key);
    else if (e.key === "Enter") solve(operandOne, numTwo, operator);
    else if (e.key === ".") addDecimal();
}

function appendEntry(num) {
    if (operandOne === "") {
        botScreen.textContent += num;
        numOne += num;
    } else if (operandOne !== "" && operator === "/" && numTwo === "0" && num === "0") {
        botScreen.textContent = ":(";
    } else if (operandOne !== "" && operator !== null) {
        botScreen.textContent += num;
        numTwo += num;
    }
}

// Function to add decimal
function addDecimal() {
    if (botScreen.textContent.includes(".")) {
        botScreen.textContent = botScreen.textContent;
    } else {
        if (operandOne === "") {
            botScreen.textContent += ".";
            numOne += ".";
        } else if (operandOne !== "" && operator !== null) {
            botScreen.textContent += ".";
            numTwo += ".";
        }
    }
}

// Delete last number entered
function back() {
    if (botScreen.textContent.length > 0) {
        botScreen.textContent = botScreen.textContent.slice(0, -1);
    }
}

// Functions for add, subtract, multiply, divide

let secOperator = null;

function appendOperator(opSign) {
    if (operandOne !== "" && numTwo !== "") {
        secOperator = opSign;
        solve(operandOne, numTwo, operator);
    } else if (result !== null) {
        operator = opSign;
        operandOne = Number(numOne);
        topScreen.textContent = `${operandOne} ${operator}`
        botScreen.textContent = ""
    } else if (operandOne === "" && operator === null) {
        operator = opSign;
        operandOne = Number(numOne);
        topScreen.textContent = `${operandOne} ${operator}`;
        botScreen.textContent = ""
    } else if (operator !== null && operandTwo === "") {
        operator = opSign;
        topScreen.textContent = `${operandOne} ${operator}`;
        botScreen.textContent = ""
    }
}

//Function to round

// function round(value, decimals) {
//     return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
// }

function shorten(e) {
    if (e.length > 10) {
        return e.slice(0,10);
    } else {
        return e;
    }
}

// // Operate function for when "=" is clicked or when second operator is clicked (i.e. 1 + 2 + => causes operate() to run and return 3 +...)

function solve(operandOne, numTwo, operator) {
    operandTwo = Number(numTwo);
    switch (operator) {
        case "+":
            value = operandOne + operandTwo;
            fit = shorten(value);
            result = parseFloat(fit);
            break;
        case "-":
            value = operandOne - operandTwo;
            fit = shorten(value);
            result = parseFloat(fit);
            break;
        case "*":
            value = operandOne * operandTwo;
            fit = shorten(value);
            result = parseFloat(fit);
            break;
        case "/":
            value = operandOne / operandTwo;
            fit = shorten(value);
            result = parseFloat(fit);
            break;
        case "^":
            value = operandOne ** operandTwo;
            fit = shorten(value);
            result = parseFloat(fit);
            break;
    }
    if (secOperator !== null) {
        numOne = result;
        topScreen.textContent = `${numOne} ${secOperator}`;
        botScreen.textContent = "";
        resetSoft = "soft";
        reset(resetSoft);
    } else {
        topScreen.textContent = `${operandOne} ${operator} ${operandTwo} =`;
        botScreen.textContent = `${result}`;
        numOne = result;
        resetHard = "hard";
        reset(resetHard);
    }

}

// Function to reset some data

function reset(method) {
    switch(method) {
        case "hard":
            numTwo = "";
            operandTwo = "";
            operator = null;
            result = "";
            break;
        case "soft":
            numTwo = "";
            operandTwo = "";
            operator = secOperator;
            secOperator = null;
            operandOne = Number(numOne);
            result = "";
            break;
    }
}

// Function to clear all existing data

function clear() {
    botScreen.textContent = "";
    topScreen.textContent = "";
    numOne = "";
    operandOne = "";
    numTwo = "";
    operandTwo = "";
    operator = null;
    result = "";
}

// Notes:
// Need to round answers with long decimals so they don't overflow
// Add keyboard support (might have issues with /)