/**
 * QuizFeedback Komponent
 * Viser feedback efter svarafgivelse
 * @param {boolean} isCorrect - Om svaret var korrekt
 */
export default function QuizFeedback({ isCorrect }) {
  return (
    <aside className="mt-6 text-center" role="status" aria-live="polite">
      <div className={`inline-block px-4 py-2 rounded-lg font-semibold ${
        isCorrect 
          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
      }`}>
        {isCorrect ? '🎉 Korrekt!' : '❌ Forkert svar'}
      </div>
    </aside>
  );
}
