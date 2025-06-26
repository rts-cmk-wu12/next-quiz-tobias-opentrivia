/**
 * CategorySelect Komponent
 * Renderer en dropdown menu til at vælge quiz kategorier
 * @param {string} value - Valgt kategori ID
 * @param {function} onChange - Funktion til håndtering af ændringer
 * @param {Array} categories - Array af kategori objekter
 * @param {boolean} loading - Indlæsningstilstand for kategorier
 */
export default function CategorySelect({ value, onChange, categories, loading = false }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Kategori
      </label>
      <select
        name="category"
        value={value}
        onChange={onChange}
        disabled={loading}
        className={`w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-200 custom-select ${
          loading 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:border-gray-400 dark:hover:border-gray-500'
        }`}
        aria-label="Vælg quiz kategori"
      >
        <option value="">
          {loading ? 'Indlæser kategorier...' : 'Enhver Kategori'}
        </option>
        {!loading && categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {loading && (
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <svg className="animate-spin -ml-1 mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Indlæser kategorier...
        </div>
      )}
    </div>
  );
}
