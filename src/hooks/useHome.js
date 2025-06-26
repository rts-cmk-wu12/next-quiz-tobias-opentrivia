import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import fetchCategories from '@/lib/api/opentdb';
import { validateQuizSettings, buildQuizParams } from '@/lib/utils';

/**
 * Custom hook til home page logik
 * @returns {Object} Home page tilstand og handlinger
 */
export function useHome() {
  const router = useRouter();

  const [quizSettings, setQuizSettings] = useState({
    category: '',
    difficulty: 'medium',
    amount: 10,
    type: 'multiple',
  });

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  // Indlæser kategorier fra Open Trivia Database API'et
  async function loadCategories() {
    try {
      setCategoriesLoading(true);
      setCategoriesError(null);

      const fetchedCategories = await fetchCategories();

      if (fetchedCategories.length === 0) {
        setCategoriesError("Ingen kategorier tilgængelige. Prøv igen senere.");
        return;
      }

      setCategories(fetchedCategories);
      console.log(`Loaded ${fetchedCategories.length} categories`);
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategoriesError("Kunne ikke indlæse kategorier. Opdater venligst siden.");
    } finally {
      setCategoriesLoading(false);
    }
  }

  /**
   * Håndterer ændringer i formularinput
   * @param {Event} event - Input ændringsevent
   */
  function handleInputChange(event) {
    const { name, value } = event.target;

    setQuizSettings(prevSettings => ({
      ...prevSettings,
      [name]: name === 'amount' ? parseInt(value, 10) || 10 : value
    }));
  }

  /**
   * Håndterer quiz start
   * @param {Event} event - Form submit event
   */
  function handleQuizStart(event) {
    event.preventDefault();

    const validation = validateQuizSettings(quizSettings);

    if (!validation.success) {
      alert(validation.message);
      return;
    }

    const params = buildQuizParams(quizSettings);
    router.push(`/quiz?${params}`);
  }

  function handleRetryCategories() {
    loadCategories();
  }

  return {
    quizSettings,
    categories,
    categoriesLoading,
    categoriesError,
    handleInputChange,
    handleQuizStart,
    handleRetryCategories
  };
}
