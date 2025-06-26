import CategorySelect from '@/components/CategorySelect';
import DifficultySelect from '@/components/DifficultySelect';
import AmountCounter from '@/components/AmountCounter';

/**
 * QuizForm Komponent
 * Formular til opsætning af quiz parametre
 * @param {Object} quizSettings - Nuværende quiz indstillinger
 * @param {Array} categories - Liste af kategorier
 * @param {boolean} categoriesLoading - Om kategorier indlæses
 * @param {string} categoriesError - Fejlbesked for kategorier
 * @param {function} onInputChange - Håndterer input ændringer
 * @param {function} onSubmit - Håndterer form submit
 * @param {function} onRetryCategories - Håndterer genindlæsning af kategorier
 */
export default function QuizForm({
  quizSettings,
  categories,
  categoriesLoading,
  categoriesError,
  onInputChange,
  onSubmit,
  onRetryCategories
}) {
  return (
    <form 
      onSubmit={onSubmit} 
      className="flex flex-col max-w-md w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg p-6 mt-4 border border-gray-200 dark:border-gray-700"
      noValidate
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Quiz Opsætning
      </h2>

      <fieldset className="space-y-6">
        <legend className="sr-only">Quiz Konfigurationsindstillinger</legend>
        
        {/* Category Selection */}
        <div>
          {categoriesError ? (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md">
              <p className="text-red-700 dark:text-red-300 text-sm mb-2">
                {categoriesError}
              </p>
              <button
                type="button"
                onClick={onRetryCategories}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 text-sm underline"
              >
                Prøv Igen
              </button>
            </div>
          ) : (
            <CategorySelect
              value={quizSettings.category}
              onChange={onInputChange}
              categories={categories}
              loading={categoriesLoading}
            />
          )}
        </div>

        {/* Difficulty Selection */}
        <DifficultySelect
          value={quizSettings.difficulty}
          onChange={onInputChange}
        />

        {/* Amount Selection */}
        <AmountCounter
          value={quizSettings.amount}
          onChange={onInputChange}
        />
      </fieldset>

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={categoriesLoading}
        className={`font-bold py-3 px-6 rounded-md mt-8 transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
          categoriesLoading
            ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white'
        }`}
      >
        {categoriesLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
        ) : (
          'Start Quiz 🚀'
        )}
      </button>
    </form>
  );
}
