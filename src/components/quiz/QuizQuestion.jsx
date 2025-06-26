import { decodeHtmlEntities, translateDifficulty } from '@/lib/utils';

/**
 * QuizQuestion Komponent
 * Viser et enkelt quiz spørgsmål med svarmuligheder
 * @param {Object} question - Spørgsmålsobjekt
 * @param {string} selectedAnswer - Nuværende valgte svar
 * @param {boolean} showFeedback - Om feedback skal vises
 * @param {function} onAnswerSelect - Funktion til svarvalg
 */
export default function QuizQuestion({ question, selectedAnswer, showFeedback, onAnswerSelect }) {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <header className="mb-4">
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded-full mb-2">
          {decodeHtmlEntities(question.category)}
        </span>
        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2 py-1 rounded-full mb-2 ml-2 capitalize">
          {translateDifficulty(question.difficulty)}
        </span>
      </header>
      
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {decodeHtmlEntities(question.question)}
      </h2>

      <fieldset className="space-y-3">
        <legend className="sr-only">Svarmuligheder</legend>
        {question.shuffledAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === answer;
          const isCorrectAnswer = answer === question.correct_answer;
          
          // Determine button styling based on state
          let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
          
          switch (true) {
            case showFeedback && isCorrectAnswer:
              buttonClass += "bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200";
              break;
            case showFeedback && isSelected && !isCorrectAnswer:
              buttonClass += "bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200";
              break;
            case showFeedback:
              buttonClass += "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300";
              break;
            case isSelected:
              buttonClass += "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-800 dark:text-blue-200";
              break;
            default:
              buttonClass += "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500";
          }

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(answer)}
              disabled={showFeedback}
              className={buttonClass}
              aria-pressed={isSelected}
              aria-describedby={showFeedback && isCorrectAnswer ? 'correct-answer' : showFeedback && isSelected ? 'incorrect-answer' : undefined}
            >
              <div className="flex items-center">
                <span className="mr-3 font-semibold text-sm" aria-hidden="true">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{decodeHtmlEntities(answer)}</span>
                {showFeedback && isCorrectAnswer && (
                  <span className="ml-auto text-green-600 dark:text-green-400" aria-label="Korrekt svar">✓</span>
                )}
                {showFeedback && isSelected && !isCorrectAnswer && (
                  <span className="ml-auto text-red-600 dark:text-red-400" aria-label="Forkert svar">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </fieldset>
    </section>
  );
}
