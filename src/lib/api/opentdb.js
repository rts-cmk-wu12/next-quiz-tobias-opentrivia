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