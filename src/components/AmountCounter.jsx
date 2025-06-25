function AmountButton({ onClick, children, position }) {
  const baseClasses = "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white font-bold py-2 px-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
  const positionClasses = position === 'left' ? 'rounded-l-md' : 'rounded-r-md';
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${positionClasses}`}
    >
      {children}
    </button>
  );
}

function AmountInput({ value, onChange, onBlur }) {
  return (
    <input
      id="amount-input"
      type="number"
      name="amount"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="bg-white dark:bg-gray-700 border-t border-b border-gray-300 dark:border-gray-600 py-2 px-4 text-center text-gray-900 dark:text-gray-100 min-w-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      min="5"
      max="50"
    />
  );
}

export default function AmountCounter({ value, onChange }) {
  // Hjælpefunktion til at oprette event-lignende objekter for onChange kompatibilitet
  function createEventObject(newValue) {
    return {
      target: {
        name: 'amount',
        value: newValue
      }
    };
  }

  function validateAndSetAmount(inputValue) {
    const numValue = parseInt(inputValue);
    let validAmount;
    
    if (isNaN(numValue) || numValue < 5) {
      validAmount = 5;
    } else if (numValue > 50) {
      validAmount = 50;
    } else {
      validAmount = numValue;
    }
    
    onChange(createEventObject(validAmount));
  }

  function incrementAmount() {
    const newValue = Math.min(50, value + 1);
    onChange(createEventObject(newValue));
  }

  function decrementAmount() {
    const newValue = Math.max(5, value - 1);
    onChange(createEventObject(newValue));
  }

  function handleAmountBlur(event) {
    validateAndSetAmount(event.target.value);
  }

  return (
    <div className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
      <label htmlFor="amount-input">Antal Spørgsmål:</label>
      <div className="flex items-center mt-2 mb-4">
        <AmountButton onClick={decrementAmount} position="left">
          -
        </AmountButton>
        <AmountInput
          value={value}
          onChange={onChange}
          onBlur={handleAmountBlur}
        />
        <AmountButton onClick={incrementAmount} position="right">
          +
        </AmountButton>
      </div>
    </div>
  );
}
