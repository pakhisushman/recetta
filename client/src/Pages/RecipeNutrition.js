import React, { useState } from 'react';
import './RecipeNutrition.css';

export const RecipeNutrition = () => {
  const [recipeName, setRecipeName] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '3a54a65f1c794257aad2da31313bbe89';

  const fetchNutritionData = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${recipeName}&apiKey=${API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results.length > 0) {
          const recipeId = data.results[0].id;
          getNutritionalInfo(recipeId);
        } else {
          setError('No recipe found for the given name');
          setNutritionData(null);
        }
      } else {
        setError('Failed to fetch data');
        setNutritionData(null);
      }
    } catch (error) {
      setError('Error fetching data');
      setNutritionData(null);
    }
  };

  const getNutritionalInfo = async (recipeId) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        setNutritionData(data);
        setError(null);
      } else {
        setError('Failed to fetch nutritional information');
        setNutritionData(null);
      }
    } catch (error) {
      setError('Error fetching nutritional information');
      setNutritionData(null);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (recipeName.trim() !== '') {
      fetchNutritionData();
    }
  };

  return (
    <div className='nutri_body'>
    <div className='nutrition_body'>
      <h1 style={{ fontSize: '24px', textAlign: 'center'}}>Recipe Nutritional Information</h1>
      <form className='nutri_form' onSubmit={handleSearch}>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter Recipe Name"
        />
        <button className='nutri_button' type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {nutritionData && (
        <div>
          <h2>Nutritional Information</h2>
          <p>Calories: {nutritionData.calories}</p>
          <p>Carbs: {nutritionData.carbs}</p>
          <p>Fat: {nutritionData.fat}</p>
          <p>Protein: {nutritionData.protein}</p>

          {/* Display other nutritional information as needed */}
        </div>
      )}
    </div>
    </div>
  );
};
