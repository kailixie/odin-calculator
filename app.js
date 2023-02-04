let numOne = "";
let operandOne = "";
let numTwo = "";
let operandTwo = "";
let operator = "";
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
    } else if (operandOne !== "" && operator !== "") {
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
        } else if (operandOne !== "" && operator !== "") {
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

// If result is not 0 then make result operand one and empty numTwo and operandTwo
// top screen should show new operand and operator
// If operandOne is empty then numOne becomes operandOne and shows on top with operator
// If operator is not empty but operand Two is then change operator on top
// If operator is not empty and neither is operand two 

let secOperator = "";

function appendOperator(opSign) {
    if (result !== "") {
        operator = `${opSign}`;
        operandOne = Number(numOne);
        topScreen.textContent = `${operandOne} ${operator}`
        botScreen.textContent = ""
    } else if (operandOne === "" && operator === "") {
        operator = `${opSign}`;
        operandOne = Number(numOne);
        topScreen.textContent = `${operandOne} ${operator}`;
        botScreen.textContent = ""
    } else if (operator !== "" && operandTwo === "") {
        operator = `${opSign}`;
        topScreen.textContent = `${operandOne} ${operator}`;
        botScreen.textContent = ""
    } else if (operator !== "" && operandTwo !== "") {
        solveOperator();
        // operandOne = Number(numOne)
        secOperator = `${opSign}`;
        // topScreen.textContent = `${operandOne} ${operator}`;
        // console.log(solve);
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
    operandTwo = Number(numTwo)
    switch (operator) {
        case "+":
            value = operandOne + operandTwo;
            fit = shorten(value)
            result = parseFloat(fit);
            break;
        case "-":
            value = operandOne - operandTwo;
            fit = shorten(value)
            result = parseFloat(fit);
            break;
        case "*":
            value = operandOne * operandTwo;
            fit = shorten(value)
            result = parseFloat(fit);
            break;
        case "/":
            value = operandOne / operandTwo;
            fit = shorten(value)
            result = parseFloat(fit);
            break;
        case "^":
            value = operandOne ** operandTwo;
            fit = shorten(value)
            result = parseFloat(fit);
            break;
    }
    topScreen.textContent = `${operandOne} ${operator} ${operandTwo} =`;
    botScreen.textContent = `${result}`;
    numOne = result;
    reset();
}

function solveOperator(operandOne, numTwo, operator) {
    operandTwo = Number(numTwo)
    switch (operator) {
        case "+":
            value = operandOne + operandTwo;
            fit = shorten(value)
            result = parseFloat(fit);
            break;
        case "-":
            value = operandOne - operandTwo;
            fit = shorten(value)
            result = parseFloat(fit);
            break;
        case "*":
            value = operandOne * operandTwo;
            fit = shorten(value)
            result = parseFloat(fit);
            break;
        case "/":
            value = operandOne / operandTwo;
            fit = shorten(value)
            result = parseFloat(fit);
            break;
        case "^":
            value = operandOne ** operandTwo;
            fit = shorten(value)
            result = parseFloat(fit);
            break;
    }
    topScreen.textContent = `${result} ${secOperator}`;
    botScreen.textContent = "";
    numOne = result;
    reset();
}

// Function to reset some data

function reset() {
    numTwo = "";
    operandTwo = "";
}

// Function to clear all existing data

function clear() {
    botScreen.textContent = "";
    topScreen.textContent = "";
    numOne = "";
    operandOne = "";
    numTwo = "";
    operandTwo = "";
    operator = "";
    result = "";
}

// Notes:
// Need to round answers with long decimals so they don't overflow
// Add decimal button but make sure that number can't have more than one decimal
// Add backspace button
// Add keyboard support (might have issues with /)