let operandStack = [];
let operatorStack = [];
let currentNUmber = "";


function precedence(op) {
    if (op == "+" || op == "-") return 1;
    if (op == "*" || op == "/" || op == "%") return 2;
    return 0;
}

function apply(a, b, op) {
    if (op === "+")
        return a + b;
    if (op === "-")
        return a - b;
    if (op === "*")
        return a * b;
    if (op === "/")
        return a / b;
    if (op === "%")
        return a % b;
}

function evaluateStacks() {
    while (operatorStack.length > 0) {
        let op = operatorStack.pop();
        let b = operandStack.pop();
        let a = operandStack.pop();
        operandStack.push(apply(a, b, op));
    }
    return operandStack.pop();
}

let calculator = document.querySelector(".calculator");
let buttons = document.querySelectorAll(".but");
let display = document.querySelector(".input_value");


buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;
        console.log("clicked:", operandStack);


        if (value === "C") {
            operandStack = [];
            operatorStack = [];
            currentNUmber = "";
            display.value = "";
            return;
        }

        if ((value >= "0" && value <= "9" || value === ".")) {
            currentNUmber += value;
            display.value += value;
            // console.log(currentNUmber);
        }
        if (["+", "-", "*", "/", "%", "(", ")",].includes(value)) {
            if (currentNUmber != "") {
                operandStack.push(parseFloat(currentNUmber));
                // console.log(operandStack);
                currentNUmber = "";
            }

            if (value == ")") {
                while (operandStack.length > 0) {
                    let topOperator = operatorStack[operatorStack.length - 1];
                    if (topOperator === "(") break;

                    let op = operatorStack.pop();
                    let b = operandStack.pop();
                    let a = operandStack.pop();
                    operandStack.push(apply(a, b, op));
                }

                operatorStack.pop();
                return;
            }
            while (operatorStack.length > 0) {
                let topOperator = operatorStack[operatorStack.length - 1];
                if (precedence(topOperator) < precedence(value)) break;

                let op = operatorStack.pop();
                let b = operandStack.pop();
                let a = operandStack.pop();
                operandStack.push(apply(a, b, op));
            }


            operatorStack.push(value);
            display.value = "";
            return;
        }


        if (value === "=") {
            if (currentNUmber !== "") {
                operandStack.push(parseFloat(currentNUmber));
                currentNUmber = "";
            }

            let result = evaluateStacks();
            display.value = result;

            // console.log("Operands:", operandStack);
            // console.log("Operators", operatorStack);
        }



    });
}); 

document.addEventListener("keydown", (event) => {
  let key = event.key;

  
  if (key === "Enter") 
    key = "=";

  
  if (key === "Escape")
     key = "C";

 
  const allowedKeys = [
    "0","1","2","3","4","5","6","7","8","9",
    "+","-","*","/","%","(",")",".","=","C"
  ];

  if (!allowedKeys.includes(key))
     display.value = "syntax error";

  buttons.forEach(button => {
    if (button.innerText === key) {
      button.click();
    }
  });
}); 












