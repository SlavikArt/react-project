import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import recipeService from "../services/RecipeService";
import { useAuth } from "../context/AuthContext";
import styles from "./RecipeList.module.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await recipeService.getRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const editRecipe = (id) => {
    navigate(`/recipes/edit/${id}`);
  };

  const deleteRecipe = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await recipeService.deleteRecipe(id);
        setRecipes(recipes.filter(recipe => recipe.id !== id));
        console.log('Recipe deleted');
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className={styles.all_recipes_h1}>All Recipes</h1>
      {recipes.length > 0 ? (
        <div className={styles.grid}>
          {recipes.map((recipe) => (
            <div key={recipe.id} className={styles.recipeCard}>
              <h2 className={`${styles.lineClamp} text-xl font-semibold`}>{recipe.name}</h2>
              <p className="text-gray-600">{recipe.description.slice(0, 90)}...</p>
              <p className="text-sm text-gray-500">By {recipe.username}</p>
              {recipe.fileUrl && (
                <img
                  src={recipe.fileUrl}
                  alt={recipe.name}
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
              {currentUser?.uid === recipe.createdBy && (
                <div className="mt-4 flex">
                  <button
                    onClick={() => editRecipe(recipe.id)}
                    className={`${styles.button} ${styles.bgBlue500} text-white px-2 py-1 rounded hover:bg-blue-600`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRecipe(recipe.id)}
                    className={`${styles.button} ${styles.bgRed500} text-white px-2 py-1 rounded hover:bg-red-600`}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
