/**
 * QuizLoading Komponent
 * Viser indlæsningsstatus for quiz spørgsmål
 */
export default function QuizLoading() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-700 dark:text-gray-300">Indlæser quiz spørgsmål...</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Dette kan tage lidt tid hvis API'et er travlt</p>
      </section>
    </main>
  );
}
