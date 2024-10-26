import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import recipeService from "../services/RecipeService";
import styles from "./RecipeEdit.module.css";

const RecipeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ name: "", description: "" });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await recipeService.getRecipe(id);
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      await recipeService.updateRecipe(id, recipe);
      navigate(`/recipes`);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className={styles.recipeDetail}>
      <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Recipe Name
          </label>
          <input
            id="name"
            value={recipe.name}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter recipe name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Recipe Description
          </label>
          <textarea
            id="description"
            value={recipe.description}
            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
            rows="4"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter recipe description"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Recipe
        </button>
      </form>
      <button onClick={() => navigate('/recipes')} className="mt-4 ml-2 text-gray-600 underline">
        Cancel
      </button>
    </div>
  );
};

export default RecipeEdit;
