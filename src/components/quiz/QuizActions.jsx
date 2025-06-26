/**
 * QuizActions Komponent
 * Viser handlingsknapper til quiz navigation
 * @param {boolean} showFeedback - Om feedback vises
 * @param {string} selectedAnswer - Valgte svar
 * @param {boolean} isLastQuestion - Om det er det sidste spørgsmål
 * @param {function} onSubmitAnswer - Funktion til at afgive svar
 * @param {function} onNextQuestion - Funktion til næste spørgsmål
 */
export default function QuizActions({ 
  showFeedback, 
  selectedAnswer, 
  isLastQuestion, 
  onSubmitAnswer, 
  onNextQuestion 
}) {
  return (
    <footer className="flex justify-center">
      {!showFeedback ? (
        <button
          onClick={onSubmitAnswer}
          disabled={!selectedAnswer}
          className={`font-bold py-3 px-8 rounded-lg transition-colors ${
            selectedAnswer
              ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          Afgiv Svar
        </button>
      ) : (
        <button
          onClick={onNextQuestion}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          {isLastQuestion ? 'Se Resultater' : 'Næste Spørgsmål'}
        </button>
      )}
    </footer>
  );
}
