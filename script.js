

let operandStack = [];
let operatorStack = [];
let currentNumber = "";
let expression = "";



function precedence(op) {
  if (op === "+" || op === "-") return 1;
  if (op === "*" || op === "/" || op === "%") return 2;
  return 0;
}

function applyOperator(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? "Error" : a / b;
  if (op === "%") return a % b;
}


function evaluateStacks() {
  while (operatorStack.length > 0) {
    let op = operatorStack.pop();
    let b = operandStack.pop();
    let a = operandStack.pop();
    operandStack.push(applyOperator(a, b, op));
  }
  return operandStack.pop();
}



let buttons = document.querySelectorAll(".but");
let display = document.querySelector(".input_value");



buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    
    if (value === "C") {
      operandStack = [];
      operatorStack = [];
      currentNumber = "";
      expression = "";
      display.value = "";
      return;
    }

    
    if ((value >= "0" && value <= "9") || value === ".") {

      
      if (value === "." && currentNumber.includes(".")) return;

      currentNumber += value;
      expression += value;
      display.value = expression;
      return;
    }

    
    if (["+","-","*","/","%","(",")"].includes(value)) {

      
      if (expression === "" && value !== "(") return;

      
      if (currentNumber !== "") {
        operandStack.push(parseFloat(currentNumber));
        currentNumber = "";
      }

      
      if (value === ")") {
        while (operatorStack.length > 0) {
          let top = operatorStack[operatorStack.length - 1];
          if (top === "(") break;

          let op = operatorStack.pop();
          let b = operandStack.pop();
          let a = operandStack.pop();
          operandStack.push(applyOperator(a, b, op));
        }
        operatorStack.pop(); 
        expression += value;
        display.value = expression;
        return;
      }

   
      while (operatorStack.length > 0) {
        let top = operatorStack[operatorStack.length - 1];
        if (precedence(top) < precedence(value)) break;

        let op = operatorStack.pop();
        let b = operandStack.pop();
        let a = operandStack.pop();
        operandStack.push(applyOperator(a, b, op));
      }

      operatorStack.push(value);
      expression += value;
      display.value = expression;
      return;
    }

   
    if (value === "=") {

      if (currentNumber !== "") {
        operandStack.push(parseFloat(currentNumber));
        currentNumber = "";
      }

      let result = evaluateStacks();

      expression = result.toString();
      display.value = expression;

      operandStack = [];
      operatorStack = [];
    }
  });
});



document.addEventListener("keydown", (event) => {
  let key = event.key;

  if (key === "Enter") key = "=";
  if (key === "Escape") key = "C";

  if (key === "Backspace") {
    currentNumber = currentNumber.slice(0, -1);
    expression = expression.slice(0, -1);
    display.value = expression;
    return;
  }

  const allowedKeys = [
    "0","1","2","3","4","5","6","7","8","9",
    "+","-","*","/","%","(",")",".","=","C"
  ];

  if (!allowedKeys.includes(key)) return;

  buttons.forEach(button => {
    if (button.innerText === key) {
      button.click();
    }
  });
});

