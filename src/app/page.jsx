'use client';

import fetchCategories from "@/lib/api/opentdb";
import { useEffect, useState } from "react";
import CategorySelect from "@/components/CategorySelect";
import DifficultySelect from "@/components/DifficultySelect";
import AmountCounter from "@/components/AmountCounter";

export default function Home() {
  const [Settings, setSettings] = useState({
    category: '',
    difficulty: 'medium',
    amount: 10,
    type: 'multiple',
  })

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function loadCategories() {
      const fetchedCategories = await fetchCategories();

      if (fetchedCategories.length === 0) {
        console.error("No categories fetched.");
        return;
      }

      setCategories(fetchedCategories);
      console.log("Fetched categories:", fetchedCategories);
    }
    loadCategories();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Settings submitted:", Settings);
  }


  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-md mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg p-6 mt-4 border border-gray-200 dark:border-gray-700">
        <span className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Trivia Setup</span>

        <CategorySelect
          value={Settings.category}
          onChange={handleChange}
          categories={categories}
        />

        <DifficultySelect
          value={Settings.difficulty}
          onChange={handleChange}
        />

        <AmountCounter
          value={Settings.amount}
          onChange={handleChange}
        />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md mt-6 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
          Start Quiz
        </button>
      </form>
    </>
  );
}