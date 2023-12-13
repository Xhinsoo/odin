//variables to store values
let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let currentOperation = null;
let shouldResetScreen = false;

// variable declaration for dom reference
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.getElementById("clearBtn");
const lastOperationScreen = document.getElementById("lastOperationScreen");
const currentOperationScreen = document.getElementById(
  "currentOperationScreen"
);
const deleteButton = document.getElementById("deleteBtn");
const equalButton = document.getElementById("equalBtn");
const pointButton = document.getElementById("pointBtn");

//adding event listeners
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
equalButton.addEventListener("click", (e) => appendEqual(e.target.innerText));
pointButton.addEventListener("click", (e) => appendPoint(e.target.innerText));

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => appendOperator(button.textContent))
);

//functions
function clear() {
  currentOperationScreen.textContent = "0";
  lastOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen)
    resetScreen();
  currentOperationScreen.textContent += number;
}

function appendOperator(operator) {
  if (
    currentOperationScreen.textContent === "0" ||
    currentOperationScreen.textContent === ""
  ) {
    lastOperationScreen.textContent = 0 + operator;
    currentOperationScreen.textContent = "";
  } else {
    lastOperationScreen.textContent =
      currentOperationScreen.textContent + operator;
    currentOperationScreen.textContent = currentOperationScreen.textContent;
    firstOperand = Number(currentOperationScreen.textContent);
    currentOperation = operator;
    shouldResetScreen = true;
  }
}

function appendEqual(equal) {
  if (
    currentOperationScreen.textContent === "0" ||
    lastOperationScreen.textContent === ""
  ) {
    lastOperationScreen.textContent =
      currentOperationScreen.textContent + equal;
    shouldResetScreen = true;
  } else if (!lastOperationScreen.textContent.includes(equal)){
    secondOperand = Number(currentOperationScreen.textContent);
    currentOperationScreen.textContent = equalOperation(
      firstOperand,
      secondOperand,
      currentOperation,
    );
    lastOperationScreen.textContent = lastOperationScreen.textContent + secondOperand + equal;
  }
}

function appendPoint(point) {
  if (currentOperationScreen.textContent.includes(point)) return;
  currentOperationScreen.textContent += point;
}

function deleteNumber() {
  if(currentOperationScreen.textContent === "" || currentOperationScreen.textContent ==="0"){
    clear();
  }else{
  currentOperationScreen.textContent =
    currentOperationScreen.textContent.substring(
      (i = 0),
      currentOperationScreen.textContent.length - 1
    );
  }
}

function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

//operation
function equalOperation(firstOperand, secondOperand, currentOperation) {
  if (currentOperation === "+") {
    return firstOperand + secondOperand;
  } else if (currentOperation === "-") {
    return firstOperand - secondOperand;
  } else if (currentOperation === "*") {
    return firstOperand * secondOperand;
  } else if (currentOperation === "÷") {
    return firstOperand / secondOperand;
  } else {
    return firstOperand, currentOperation, secondOperand;
  }
}