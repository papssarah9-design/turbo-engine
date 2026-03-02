let display = document.getElementById('display');
let currentValue = '0';
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentValue;
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentValue = '';
        shouldResetDisplay = false;
    }
    
    if (currentValue === '0' && value !== '.') {
        currentValue = value;
    } else {
        // Prevent multiple decimal points
        if (value === '.' && currentValue.includes('.')) {
            return;
        }
        currentValue += value;
    }
    
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteChar() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        // Validate input contains only allowed characters (numbers, operators, decimal point)
        if (!/^[0-9+\-*/.() ]+$/.test(currentValue)) {
            currentValue = 'Error';
            shouldResetDisplay = true;
            updateDisplay();
            return;
        }
        
        // Using eval for simple calculation (input is validated above)
        const result = eval(currentValue);
        
        if (isNaN(result) || !isFinite(result)) {
            currentValue = 'Error';
        } else {
            // Round to 10 decimal places to avoid floating point issues
            currentValue = Math.round(result * 10000000000) / 10000000000 + '';
        }
        
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        currentValue = 'Error';
        shouldResetDisplay = true;
        updateDisplay();
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendToDisplay(key);
    } else if (key === '.') {
        appendToDisplay('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteChar();
    }
});
