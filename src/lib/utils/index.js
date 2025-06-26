// ===== ARRAY HJÆLPEFUNKTIONER =====

/**
 * Blander et array ved hjælp af Fisher-Yates algoritmen
 * @param {Array} array - Array der skal blandes
 * @returns {Array} Blandet array
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ===== QUIZ BEHANDLING =====

/**
 * Behandler et enkelt spørgsmål ved at blande svar
 * @param {Object} question - Råt spørgsmålsobjekt fra API
 * @returns {Object} Behandlet spørgsmål med blandede svar
 */
export function processQuestion(question) {
  const allAnswers = [...question.incorrect_answers, question.correct_answer];
  const shuffledAnswers = shuffleArray(allAnswers);
  
  return {
    ...question,
    shuffledAnswers
  };
}

// ===== VALIDERING =====

/**
 * Validerer quiz indstillinger før start
 * @param {Object} settings - Quiz indstillinger
 * @returns {Object} Valideringsresultat med success og fejlbesked
 */
export function validateQuizSettings(settings) {
  if (settings.amount < 5 || settings.amount > 50) {
    return {
      success: false,
      message: "Vælg venligst mellem 5 og 50 spørgsmål."
    };
  }

  return {
    success: true,
    message: null
  };
}

// ===== URL HJÆLPEFUNKTIONER =====

/**
 * Bygger URL parametre til quiz navigation
 * @param {Object} settings - Quiz indstillinger
 * @returns {string} URL parameter streng
 */
export function buildQuizParams(settings) {
  const searchParams = new URLSearchParams({
    amount: settings.amount.toString(),
    difficulty: settings.difficulty,
    type: settings.type,
  });
  
  if (settings.category && settings.category.trim() !== '') {
    searchParams.append('category', settings.category);
  }

  return searchParams.toString();
}

// ===== OVERSÆTTELSE =====

/**
 * Oversætter sværhedsgrad til dansk
 * @param {string} difficulty - Sværhedsgrad på engelsk
 * @returns {string} Sværhedsgrad på dansk
 */
export function translateDifficulty(difficulty) {
  switch (difficulty) {
    case 'easy':
      return 'let';
    case 'medium':
      return 'mellem';
    case 'hard':
      return 'svær';
    default:
      return difficulty;
  }
}

// ===== KATEGORIER =====

/**
 * Finder kategorinavn baseret på ID
 * @param {Array} categories - Array af kategorier
 * @param {string} categoryId - Kategori ID
 * @returns {string} Kategorinavn eller fallback tekst
 */
export function getCategoryName(categories, categoryId) {
  if (!categoryId) {
    return 'Alle kategorier';
  }
  
  const category = categories.find(cat => cat.id.toString() === categoryId);
  return category?.name || 'Valgt kategori';
}

// ===== PRÆSTATION =====

/**
 * Henter præstationsbesked baseret på pointprocent
 * @param {number} scorePercentage - Point som procent
 * @returns {Object} Beskedobjekt med tekst og farve
 */
export function getPerformanceMessage(scorePercentage) {
  if (scorePercentage === 100) {
    return { text: '🏆 Perfekt! Fremragende!', color: 'text-green-600 dark:text-green-400' };
  } else if (scorePercentage >= 80) {
    return { text: '🌟 Fantastisk arbejde!', color: 'text-blue-600 dark:text-blue-400' };
  } else if (scorePercentage >= 60) {
    return { text: '👍 Godt klaret!', color: 'text-yellow-600 dark:text-yellow-400' };
  } else {
    return { text: '💪 Bliv ved med at øve!', color: 'text-orange-600 dark:text-orange-400' };
  }
}

/**
 * Dekoder HTML entities til normal tekst
 * Open Trivia API'et returnerer HTML-kodet tekst som &quot; i stedet for "
 * @param {string} text - Tekst med HTML entities
 * @returns {string} Dekodet tekst
 */
export function decodeHtmlEntities(text) {
  if (!text) return '';
  
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&euro;/g, '€')
    .replace(/&pound;/g, '£')
    .replace(/&nbsp;/g, ' ')
    .replace(/&shy;/g, '');
}
