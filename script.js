// Get elements
const display = document.getElementById('display');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');
const equalsButton = document.getElementById('equals');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');
const numberButtons = document.querySelectorAll('#zero, #one, #two, #three, #four, #five, #six, #seven, #eight, #nine');
const errorMessage = document.getElementById('error-message');

// Initialize variables
let currentNumber = '';
let previousNumber = '';
let operation = '';

// Function to update display
function updateDisplay() {
    display.value = currentNumber;
}

// Function to handle number button clicks
function handleNumberClick(number) {
    currentNumber += number;
    updateDisplay();
}

// Function to handle operation button clicks
function handleOperationClick(op) {
    if (currentNumber !== '') {
        previousNumber = currentNumber;
        currentNumber = '';
        operation = op;
    }
}

// Function to handle equals button click
function handleEqualsClick() {
    if (previousNumber !== '' && currentNumber !== '') {
        let result;
        switch (operation) {
            case '+':
                result = parseFloat(previousNumber) + parseFloat(currentNumber);
                break;
            case '-':
                result = parseFloat(previousNumber) - parseFloat(currentNumber);
                break;
            case '*':
                result = parseFloat(previousNumber) * parseFloat(currentNumber);
                break;
            case '/':
                if (currentNumber !== '0') {
                    result = parseFloat(previousNumber) / parseFloat(currentNumber);
                } else {
                    errorMessage.textContent = 'Error: Division by zero';
                    return;
                }
                break;
            default:
                return;
        }
        currentNumber = result.toString();
        previousNumber = '';
        operation = '';
        updateDisplay();
    }
}

// Function to handle clear button click
function handleClearClick() {
    currentNumber = '';
    previousNumber = '';
    operation = '';
    updateDisplay();
    errorMessage.textContent = '';
}

// Function to handle backspace button click
function handleBackspaceClick() {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
}

// Add event listeners to buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleNumberClick(button.textContent);
    });
});

addButton.addEventListener('click', () => {
    handleOperationClick('+');
});

subtractButton.addEventListener('click', () => {
    handleOperationClick('-');
});

multiplyButton.addEventListener('click', () => {
    handleOperationClick('*');
});

divideButton.addEventListener('click', () => {
    handleOperationClick('/');
});

equalsButton.addEventListener('click', handleEqualsClick);

clearButton.addEventListener('click', handleClearClick);

backspaceButton.addEventListener('click', handleBackspaceClick);