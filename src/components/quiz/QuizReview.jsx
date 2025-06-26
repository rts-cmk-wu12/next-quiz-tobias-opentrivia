import { decodeHtmlEntities } from '@/lib/utils';

/**
 * QuizReview Komponent
 * Viser detaljeret gennemgang af alle spørgsmål og svar
 * @param {Array} userAnswers - Array af brugerens svar
 * @param {function} onClose - Funktion til at lukke reviewet
 */
export default function QuizReview({ userAnswers, onClose }) {
  if (!userAnswers || userAnswers.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <header className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b dark:border-gray-600">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              📚 Gennemgang af Spørgsmål
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
              aria-label="Luk gennemgang"
            >
              ×
            </button>
          </div>
        </header>

        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          <div className="space-y-6">
            {userAnswers.map((answer, index) => (
              <article
                key={index}
                className={`border rounded-lg p-4 ${
                  answer.isCorrect
                    ? 'border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20'
                    : 'border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                }`}
              >
                <header className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Spørgsmål {index + 1}
                  </span>
                  <span className={`text-lg ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {answer.isCorrect ? '✅' : '❌'}
                  </span>
                </header>

                <div className="mb-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-3">
                    {decodeHtmlEntities(answer.question)}
                  </h3>

                  <div className="space-y-2">
                    {answer.allAnswers.map((option, optionIndex) => {
                      const isUserAnswer = option === answer.userAnswer;
                      const isCorrectAnswer = option === answer.correctAnswer;
                      
                      let classes = 'p-2 rounded border text-sm ';
                      
                      if (isCorrectAnswer) {
                        classes += 'border-green-400 bg-green-100 dark:bg-green-900/30 dark:border-green-600 text-green-800 dark:text-green-200';
                      } else if (isUserAnswer && !answer.isCorrect) {
                        classes += 'border-red-400 bg-red-100 dark:bg-red-900/30 dark:border-red-600 text-red-800 dark:text-red-200';
                      } else {
                        classes += 'border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-300';
                      }

                      return (
                        <div key={optionIndex} className={classes}>
                          <div className="flex items-center gap-2">
                            {isCorrectAnswer && <span>✅</span>}
                            {isUserAnswer && !answer.isCorrect && <span>❌</span>}
                            <span>{decodeHtmlEntities(option)}</span>
                          </div>
                          {isCorrectAnswer && (
                            <div className="text-xs mt-1 font-medium">
                              Korrekt svar
                            </div>
                          )}
                          {isUserAnswer && !answer.isCorrect && (
                            <div className="text-xs mt-1 font-medium">
                              Dit svar
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <footer className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t dark:border-gray-600">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Luk Gennemgang
          </button>
        </footer>
      </div>
    </div>
  );
}
