import { translateDifficulty, getCategoryName } from '@/lib/utils';

/**
 * QuizPreview Komponent
 * Viser forhåndsvisning af quiz indstillinger
 * @param {Object} quizSettings - Quiz indstillinger
 * @param {Array} categories - Liste af kategorier
 */
export default function QuizPreview({ quizSettings, categories }) {
  return (
    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Quiz Forhåndsvisning:
      </h3>
      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
        <li>• {quizSettings.amount} spørgsmål</li>
        <li>• {translateDifficulty(quizSettings.difficulty)} sværhedsgrad</li>
        <li>• {getCategoryName(categories, quizSettings.category)}</li>
        <li>• Valgmuligheder format</li>
      </ul>
    </div>
  );
}
