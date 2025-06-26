/**
 * DifficultySelect Komponent
 * Renderer en dropdown menu til at vælge quiz sværhedsgrad
 * @param {string} value - Valgt sværhedsgrad
 * @param {function} onChange - Funktion der håndterer ændringer
 */
export default function DifficultySelect({ value, onChange }) {
  const difficulties = [
    { value: 'easy', label: 'Let', icon: '🟢' },
    { value: 'medium', label: 'Mellem', icon: '🟡' },
    { value: 'hard', label: 'Svær', icon: '🔴' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Sværhedsgrad
      </label>
      <select
        name="difficulty"
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 custom-select"
        aria-label="Vælg quiz sværhedsgrad"
      >
        {difficulties.map(difficulty => (
          <option key={difficulty.value} value={difficulty.value}>
            {difficulty.icon} {difficulty.label}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Vælg sværhedsgraden der matcher din viden
      </p>
    </div>
  );
}
