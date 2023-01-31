const calculatorDisplay = document.querySelector("h1");
const inputButtons = document.querySelectorAll("button");
const clearButton = document.getElementById("clear-btn");

let firstOperand = 0;
let currentOperator = "";
let waitingForNextOperand = false;

const calculatorOperators = {
  "/": (firstNum, secondNum) => firstNum / secondNum,
  "*": (firstNum, secondNum) => firstNum * secondNum,
  "+": (firstNum, secondNum) => firstNum + secondNum,
  "-": (firstNum, secondNum) => firstNum - secondNum,
  "=": (firstNum, secondNum) => secondNum,
};

function addNumberToDisplay(num) {
  if (waitingForNextOperand) {
    calculatorDisplay.textContent = num;
    waitingForNextOperand = false;
  } else {
    const currentDisplay = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      currentDisplay === "0" ? num : currentDisplay + num;
  }
}

function addDecimalToDisplay() {
  if (waitingForNextOperand) return;
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

function performCalculation(operator) {
  const currentDisplay = Number(calculatorDisplay.textContent);
  if (currentOperator && waitingForNextOperand) {
    currentOperator = operator;
    return;
  }
  if (!firstOperand) {
    firstOperand = currentDisplay;
  } else {
    const calculation = calculatorOperators[currentOperator](
      firstOperand,
      currentDisplay
    );
    calculatorDisplay.textContent = calculation;
    firstOperand = calculation;
  }
  waitingForNextOperand = true;
  currentOperator = operator;
}

inputButtons.forEach((inputButton) => {
  if (!inputButton.classList.length) {
    inputButton.addEventListener("click", () =>
      addNumberToDisplay(inputButton.value)
    );
  } else if (inputButton.classList.contains("operator")) {
    inputButton.addEventListener("click", () =>
      performCalculation(inputButton.value)
    );
  } else if (inputButton.classList.contains("decimal")) {
    inputButton.addEventListener("click", addDecimalToDisplay);
  }
});

function resetCalculator() {
  firstOperand = 0;
  currentOperator = "";
  waitingForNextOperand = false;
  calculatorDisplay.textContent = "0";
}

clearButton.addEventListener("click", resetCalculator);
