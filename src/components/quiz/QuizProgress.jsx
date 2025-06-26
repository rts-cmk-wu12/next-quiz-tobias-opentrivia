/**
 * QuizProgress Komponent
 * Viser fremskridt gennem quizzen
 * @param {number} currentQuestionIndex - Nuværende spørgsmålsindeks
 * @param {number} totalQuestions - Samlet antal spørgsmål
 * @param {number} score - Nuværende point
 */
export default function QuizProgress({ currentQuestionIndex, totalQuestions, score }) {
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <header className="mb-6">
      <nav className="flex justify-between items-center mb-2" aria-label="Quiz fremskridt">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Spørgsmål {currentQuestionIndex + 1} af {totalQuestions}
        </span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Point: {score}
        </span>
      </nav>
      <div 
        className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" 
        role="progressbar" 
        aria-valuenow={currentQuestionIndex + 1} 
        aria-valuemax={totalQuestions} 
        aria-label={`Spørgsmål ${currentQuestionIndex + 1} af ${totalQuestions}`}
      >
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </header>
  );
}
