'use client';

import QuizHeader from "@/components/QuizHeader";
import QuizForm from "@/components/home/QuizForm";
import QuizPreview from "@/components/home/QuizPreview";
import { useHome } from "@/hooks/useHome";

export default function Home() {
  const {
    quizSettings,
    categories,
    categoriesLoading,
    categoriesError,
    handleInputChange,
    handleQuizStart,
    handleRetryCategories
  } = useHome();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <section className="max-w-4xl mx-auto">
        <QuizHeader />
        
        <section className="flex justify-center">
          <div className="w-full max-w-md">
            <QuizForm
              quizSettings={quizSettings}
              categories={categories}
              categoriesLoading={categoriesLoading}
              categoriesError={categoriesError}
              onInputChange={handleInputChange}
              onSubmit={handleQuizStart}
              onRetryCategories={handleRetryCategories}
            />
            
            <QuizPreview 
              quizSettings={quizSettings}
              categories={categories}
            />
          </div>
        </section>
      </section>
    </main>
  );
}