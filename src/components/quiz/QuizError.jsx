/**
 * QuizError Komponent
 * Viser fejlmeddelelser og genindlæsningsmuligheder
 * @param {string} error - Fejlbesked der skal vises
 * @param {function} onRetry - Funktion til at prøve igen
 * @param {function} onBackToHome - Funktion til at gå tilbage til start
 */
export default function QuizError({ error, onRetry, onBackToHome }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Kan ikke indlæse quiz</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
        <div className="space-y-3">
          <button 
            onClick={onRetry}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Prøv Igen
          </button>
          <button 
            onClick={onBackToHome}
            className="w-full bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Tilbage til Start
          </button>
        </div>
      </section>
    </main>
  );
}
