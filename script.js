let display = document.getElementById('display');
let currentValue = '0';
let operator = null;
let previousValue = null;

function updateDisplay() {
    display.textContent = currentValue;
}

function clearCalculator() {
    currentValue = '0';
    operator = null;
    previousValue = null;
    updateDisplay();
}

function handleNumber(number) {
    if (currentValue === '0') {
        currentValue = number;
    } else {
        currentValue += number;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (operator !== null) {
        calculate();
    }
    previousValue = currentValue;
    currentValue = '0';
    operator = op;
}

function handleDecimal() {
    if (!currentValue.includes('.')) {
        currentValue += '.';
        updateDisplay();
    }
}

function calculate() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'x':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
    }

    currentValue = result.toString();
    operator = null;
    previousValue = null;
    updateDisplay();
}

document.querySelectorAll('.element').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (!isNaN(value) || value === '0') {
            handleNumber(value);
        } else if (value === '.') {
            handleDecimal();
        } else if (['+', '-', 'x', '÷'].includes(value)) {
            handleOperator(value);
        } else if (value === '=') {
            calculate();
        } else if (value === 'AC') {
            clearCalculator();
        } else if (value === '%') {
            currentValue = (parseFloat(currentValue) / 100).toString();
            updateDisplay();
        } else {
            currentValue = (parseFloat(currentValue) * -1).toString();
            updateDisplay();
        }
    });
});

// Initialize display
updateDisplay();
