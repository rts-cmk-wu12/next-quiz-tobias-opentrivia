/**
 * AmountButton Komponent
 * Viser forøgelses-/reduktionsknapper til mængdetælleren
 * @param {function} onClick - Klikfunktion
 * @param {React.ReactNode} children - Indhold af knappen
 * @param {string} position - Knappens position ('left' eller 'right')
 * @param {boolean} disabled - Om knappen er deaktiveret
 */
function AmountButton({ onClick, children, position, disabled = false }) {
  const baseClasses = "font-bold py-2 px-3 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200";
  const positionClasses = position === 'left' ? 'rounded-l-md' : 'rounded-r-md';
  const stateClasses = disabled 
    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white hover:border-gray-400 dark:hover:border-gray-500';
  
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${positionClasses} ${stateClasses}`}
      aria-label={position === 'left' ? 'Reducer antal' : 'Forøg antal'}
    >
      {children}
    </button>
  );
}

/**
 * AmountInput Komponent
 * Viser nummeret input til spørgsmålsantal
 * @param {number} value - Nuværende værdi
 * @param {function} onChange - Ændringsfunktion
 * @param {function} onBlur - Blur-funktion
 * @param {number} min - Minimum værdi
 * @param {number} max - Maksimum værdi
 */
function AmountInput({ value, onChange, onBlur, min, max }) {
  return (
    <input
      id="amount-input"
      type="number"
      name="amount"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      min={min}
      max={max}
      className="bg-white dark:bg-gray-700 border-t border-b border-gray-300 dark:border-gray-600 py-2 px-4 text-center text-gray-900 dark:text-gray-100 min-w-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      aria-describedby="amount-help"
    />
  );
}

/**
 * AmountCounter Komponent
 * Viser en tæller input til at vælge antallet af quiz-spørgsmål
 * @param {number} value - Nuværende mængdeværdi
 * @param {function} onChange - Håndteringsfunktion for ændringer
 */
export default function AmountCounter({ value, onChange }) {
  const MIN_AMOUNT = 5;
  const MAX_AMOUNT = 50;

  /**
   * Opretter et event lignende objekt for onChange-kompatibilitet
   * @param {number} newValue - Ny mængdeværdi
   * @returns {Object} event lignende objekt
   */
  function createChangeEvent(newValue) {
    return {
      target: {
        name: 'amount',
        value: newValue
      }
    };
  }

  /**
   * Validerer og indstiller antallet inden for tilladte grænser
   * @param {string|number} inputValue - Inputværdi der skal valideres
   */
  function validateAndSetAmount(inputValue) {
    const numValue = parseInt(inputValue, 10);
    let validAmount;
    
    if (isNaN(numValue) || numValue < MIN_AMOUNT) {
      validAmount = MIN_AMOUNT;
    } else if (numValue > MAX_AMOUNT) {
      validAmount = MAX_AMOUNT;
    } else {
      validAmount = numValue;
    }
    
    onChange(createChangeEvent(validAmount));
  }

  function handleIncrement() {
    if (value < MAX_AMOUNT) {
      const newValue = Math.min(MAX_AMOUNT, value + 1);
      onChange(createChangeEvent(newValue));
    }
  }

  function handleDecrement() {
    if (value > MIN_AMOUNT) {
      const newValue = Math.max(MIN_AMOUNT, value - 1);
      onChange(createChangeEvent(newValue));
    }
  }

  /**
   * Håndterer input blur for at validere den indtastede værdi
   * @param {Event} event - Input blur event
   */
  function handleInputBlur(event) {
    validateAndSetAmount(event.target.value);
  }

  return (
    <div className="space-y-2">
      <label htmlFor="amount-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Antal Spørgsmål
      </label>
      <div className="flex items-center">
        <AmountButton 
          onClick={handleDecrement} 
          position="left"
          disabled={value <= MIN_AMOUNT}
        >
          −
        </AmountButton>
        <AmountInput
          value={value}
          onChange={onChange}
          onBlur={handleInputBlur}
          min={MIN_AMOUNT}
          max={MAX_AMOUNT}
        />
        <AmountButton 
          onClick={handleIncrement} 
          position="right"
          disabled={value >= MAX_AMOUNT}
        >
          +
        </AmountButton>
      </div>
      <p id="amount-help" className="text-xs text-gray-500 dark:text-gray-400">
        Vælg mellem {MIN_AMOUNT} og {MAX_AMOUNT} spørgsmål
      </p>
    </div>
  );
}
