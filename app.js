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
const invertKey = document.getElementById('invert');

// Create buttons for all numbers, functions, and equals key

numKeys.forEach(numKey => numKey.addEventListener("click", () => {appendEntry(numKey.value)}));
deleteKey.addEventListener("click", back);
operateKeys.forEach(operateKey => operateKey.addEventListener("click", () => {appendOperator(operateKey.value)}));
decimalKey.addEventListener("click", addDecimal);
enterKey.addEventListener("click", () => solve(operandOne, numTwo, operator));
clearKey.addEventListener("click", clear);
invertKey.addEventListener("click", () => {appendEntry("sign");})


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
    if (num === "sign") {
        if (operandOne === "" && botScreen.textContent === numOne) {
            numOne = changeSign(numOne);
            botScreen.textContent = numOne;
        } else if (operandOne !== "" && operator !== null) {
            numTwo = changeSign(numTwo);
            botScreen.textContent = numTwo;
        } sayText("invert sign");
    } else {
        if (operandOne === "") {
            if (numOne.length < 13) {
                botScreen.textContent += num;
                numOne += num;
            }
        } else if (operandOne !== "" && operator === "/" && numTwo === "0" && num === "0") {
            botScreen.textContent = "ERROR";
        } else if (operandOne !== "" && operator !== null) {
            if (numTwo.length < 13) {
                botScreen.textContent += num;
                numTwo += num;
            }
        } sayText(num);
    }
}

function changeSign(value) {
    const invertNum = -value;
    invertStr = invertNum.toString();
    return invertStr;
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
    } sayText("point")
}

// Delete last number entered
function back() {
    if (botScreen.textContent.length > 0) {
        botScreen.textContent = botScreen.textContent.slice(0, -1);
    } sayText("delete");
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
    switch (opSign) {
        case "^":
            sayText("to the power of");
            break;
        case "+":
            sayText("plus");
            break;
        case "-":
            sayText("minus");
            break;
        case "/":
            sayText("divided by");
            break;
        case "*":
            sayText("multiplied by");
            break;
    }
}

function shorten(num) {
    let str = num.toString();
    if (str.length > 14) {
        roundStr = str.slice(13, 15);
        round = Math.round(Number(roundStr)/100);
        newStr = str.slice(0, 13)+`${round}`
        return Number(newStr);
    } else {
        return num;
    }
}

// // Operate function for when "=" is clicked or when second operator is clicked (i.e. 1 + 2 + => causes operate() to run and return 3 +...)

function solve(operandOne, numTwo, operator) {
    operandTwo = Number(numTwo);
    switch (operator) {
        case "+":
            value = operandOne + operandTwo;
            result = shorten(value);
            break;
        case "-":
            value = operandOne - operandTwo;
            result = shorten(value);
            break;
        case "*":
            value = operandOne * operandTwo;
            result = shorten(value);
            break;
        case "/":
            value = operandOne / operandTwo;
            result = shorten(value);
            break;
        case "^":
            value = operandOne ** operandTwo;
            result = shorten(value);
            break;
    }
    if (secOperator !== null) {
        numOne = result;
        sayText(`equals ${result}`);
        topScreen.textContent = `${numOne} ${secOperator}`;
        botScreen.textContent = "";
        resetSoft = "soft";
        reset(resetSoft);
    } else {
        sayText(`equals ${result}`);
        topScreen.textContent = `${operandOne} ${operator} ${operandTwo} =`;
        botScreen.textContent = `${result}`;
        numOne = result.toString();
        resetHard = "hard";
        reset(resetHard);
    }

}

// Function to reset some data

function reset(method) {
    switch(method) {
        case "hard":
            operandOne = "";
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
    sayText("cleared");
}

let synth = window.speechSynthesis;

let voiceChoice;
setTimeout(() => {
    voiceChoice = synth.getVoices()[4];
}, 300);

function sayText(message) {
    const utterThis = new SpeechSynthesisUtterance(message);
    utterThis.voice = voiceChoice;
    utterThis.lang = "en-US";
    synth.speak(utterThis);
}