import { useState } from 'react';
import { getPerformanceMessage } from '@/lib/utils';
import QuizReview from './QuizReview';

/**
 * QuizCompletion Komponent
 * Viser resultater når quizzen er fuldført
 * @param {number} score - Antal korrekte svar
 * @param {number} totalQuestions - Samlet antal spørgsmål
 * @param {Array} userAnswers - Brugerens svar til alle spørgsmål
 * @param {function} onRestart - Funktion til at starte en ny quiz
 */
export default function QuizCompletion({ score, totalQuestions, userAnswers, onRestart }) {
  const [showReview, setShowReview] = useState(false);
  
  const scorePercentage = Math.round((score / totalQuestions) * 100);
  const performanceMessage = getPerformanceMessage(scorePercentage);

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <header>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Quiz Fuldført! 🎉
            </h1>
          </header>
          
          <article className="mb-6">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {score} / {totalQuestions}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              {scorePercentage}% Korrekt
            </div>
          </article>

          <aside className="mb-6">
            <p className={`font-semibold ${performanceMessage.color}`}>
              {performanceMessage.text}
            </p>
          </aside>

          <div className="space-y-3">
            <button
              onClick={() => setShowReview(true)}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors"
            >
              📚 Se Gennemgang af Svar
            </button>
            
            <button
              onClick={onRestart}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full transition-colors"
            >
              Start Ny Quiz
            </button>
          </div>
        </section>
      </main>

      {showReview && (
        <QuizReview
          userAnswers={userAnswers}
          onClose={() => setShowReview(false)}
        />
      )}
    </>
  );
}
