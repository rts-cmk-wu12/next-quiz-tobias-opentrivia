'use client';

import { useQuiz } from '@/hooks/useQuiz';
import QuizLoading from '@/components/quiz/QuizLoading';
import QuizError from '@/components/quiz/QuizError';
import QuizCompletion from '@/components/quiz/QuizCompletion';
import QuizProgress from '@/components/quiz/QuizProgress';
import QuizQuestion from '@/components/quiz/QuizQuestion';
import QuizActions from '@/components/quiz/QuizActions';
import QuizFeedback from '@/components/quiz/QuizFeedback';

export default function QuizPage({ searchParams }) {
  const {
    quizState,
    handleAnswerSelect,
    handleSubmitAnswer,
    handleNextQuestion,
    handleRestartQuiz,
    handleRetryQuiz
  } = useQuiz(searchParams);

  if (quizState.loading) {
    return <QuizLoading />;
  }

  if (quizState.error) {
    return (
      <QuizError 
        error={quizState.error}
        onRetry={handleRetryQuiz}
        onBackToHome={handleRestartQuiz}
      />
    );
  }

  if (quizState.questions.length === 0) {
    return (
      <QuizError 
        error="Beklager, vi kunne ikke indlæse spørgsmål til dit valg."
        onRetry={handleRetryQuiz}
        onBackToHome={handleRestartQuiz}
      />
    );
  }

  if (quizState.quizCompleted) {
    return (
      <QuizCompletion 
        score={quizState.score}
        totalQuestions={quizState.questions.length}
        userAnswers={quizState.userAnswers}
        onRestart={handleRestartQuiz}
      />
    );
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState.currentQuestionIndex >= quizState.questions.length - 1;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <QuizProgress 
          currentQuestionIndex={quizState.currentQuestionIndex}
          totalQuestions={quizState.questions.length}
          score={quizState.score}
        />

        <QuizQuestion 
          question={currentQuestion}
          selectedAnswer={quizState.selectedAnswer}
          showFeedback={quizState.showFeedback}
          onAnswerSelect={handleAnswerSelect}
        />

        <QuizActions 
          showFeedback={quizState.showFeedback}
          selectedAnswer={quizState.selectedAnswer}
          isLastQuestion={isLastQuestion}
          onSubmitAnswer={handleSubmitAnswer}
          onNextQuestion={handleNextQuestion}
        />

        {quizState.showFeedback && (
          <QuizFeedback isCorrect={quizState.isCorrect} />
        )}
      </div>
    </main>
  );
}