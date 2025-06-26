/**
 * Henter alle tilgængelige trivia kategorier fra API'et
 * @returns {Promise<Array>} Array af kategori objekter med id og navn
 */
export default async function fetchCategories() {
  try {
    const response = await fetch('https://opentdb.com/api_category.php');

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return data.trivia_categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Henter quiz spørgsmål fra Open Trivia Database API'et
 * @param {Object} config - Konfigurationsobjekt for quizzen
 * @param {number} config.amount - Antal spørgsmål (standard: 10)
 * @param {string} config.category - Kategori ID (valgfri)
 * @param {string} config.difficulty - Sværhedsgrad (standard: 'medium')
 * @param {string} config.type - Spørgsmålstype (standard: 'multiple')
 * @returns {Promise<Array>} Array af spørgsmålsobjekter
 */
export async function fetchQuizQuestions({ amount = 10, category, difficulty = 'medium', type = 'multiple' }) {
  try {
    const params = new URLSearchParams({
      amount: amount.toString(),
      difficulty,
      type
    });

    if (category && category !== '') {
      params.append('category', category);
    }

    const url = `https://opentdb.com/api.php?${params.toString()}`;
    console.log('Fetching from:', url);
    
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Kunne ikke hente data fra serveren');
    }

    const data = await response.json();

    return data.results || [];
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw new Error('Der opstod en fejl. Prøv igen senere.');
  }
}