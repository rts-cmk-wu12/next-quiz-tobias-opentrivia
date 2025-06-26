import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { fetchQuizQuestions } from '@/lib/api/opentdb';
import { processQuestion } from '@/lib/utils';

/**
 * Custom hook til quiz logik
 * @param {Object} searchParams - URL søgeparametre
 * @returns {Object} Quiz tilstand og handlinger
 */
export function useQuiz(searchParams) {
  const router = useRouter();

  const [quizState, setQuizState] = useState({
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: '',
    score: 0,
    showFeedback: false,
    isCorrect: false,
    loading: true,
    quizCompleted: false,
    error: null,
    userAnswers: []
  });

  const loadQuizQuestions = useCallback(async () => {
    try {
      setQuizState(prev => ({ ...prev, loading: true, error: null }));

      const params = await Promise.resolve(searchParams);
      const quizConfig = {
        amount: parseInt(params.amount) || 10,
        category: params.category || '',
        difficulty: params.difficulty || 'medium',
        type: params.type || 'multiple'
      };

      console.log('Loading quiz with config:', quizConfig);

      const fetchedQuestions = await fetchQuizQuestions(quizConfig);

      if (fetchedQuestions.length === 0) {
        console.error("No questions received from API");
        setQuizState(prev => ({
          ...prev,
          loading: false,
          error: "Kunne ikke hente spørgsmål. API'et kan være overbelastet. Prøv igen med andre indstillinger eller vent et øjeblik."
        }));
        return;
      }

      const processedQuestions = fetchedQuestions.map(processQuestion);

      setQuizState(prev => ({
        ...prev,
        questions: processedQuestions,
        loading: false,
        error: null,
        userAnswers: []
      }));

      console.log(`Quiz loaded with ${processedQuestions.length} questions`);
    } catch (error) {
      console.error("Error loading quiz questions:", error);
      setQuizState(prev => ({
        ...prev,
        loading: false,
        error: "Der opstod en fejl ved indlæsning af spørgsmål. API'et kan være overbelastet på grund af mange anmodninger. Prøv igen om lidt."
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    loadQuizQuestions();
  }, [loadQuizQuestions]);

  /**
   * Håndterer svarvalg
   * @param {string} answer - Valgte svar
   */
  function handleAnswerSelect(answer) {
    if (quizState.showFeedback) return;

    setQuizState(prev => ({
      ...prev,
      selectedAnswer: answer
    }));
  }

  // Håndterer svarafgivelse
  function handleSubmitAnswer() {
    if (!quizState.selectedAnswer) return;

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = quizState.selectedAnswer === currentQuestion.correct_answer;

    const answerRecord = {
      questionIndex: quizState.currentQuestionIndex,
      question: currentQuestion.question,
      userAnswer: quizState.selectedAnswer,
      correctAnswer: currentQuestion.correct_answer,
      isCorrect: isCorrect,
      allAnswers: currentQuestion.shuffledAnswers
    };

    setQuizState(prev => ({
      ...prev,
      isCorrect,
      showFeedback: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      userAnswers: [...prev.userAnswers, answerRecord]
    }));
  }

  // Håndterer navigation til næste spørgsmål
  function handleNextQuestion() {
    const isLastQuestion = quizState.currentQuestionIndex >= quizState.questions.length - 1;

    if (isLastQuestion) {
      setQuizState(prev => ({ ...prev, quizCompleted: true }));
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        selectedAnswer: '',
        showFeedback: false,
        isCorrect: false
      }));
    }
  }

  // Håndterer quiz genstart
  function handleRestartQuiz() {
    router.push('/');
  }

  // Håndterer genindlæsning af quiz
  function handleRetryQuiz() {
    loadQuizQuestions();
  }

  return {
    quizState,
    handleAnswerSelect,
    handleSubmitAnswer,
    handleNextQuestion,
    handleRestartQuiz,
    handleRetryQuiz
  };
}
