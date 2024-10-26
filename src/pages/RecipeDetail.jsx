import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeService from '../services/RecipeService';
import { useAuth } from '../context/AuthContext';
import styles from './RecipeDetail.module.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await recipeService.getRecipe(id);
        setRecipe(fetchedRecipe);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    if (currentUser) {
      setCurrentUserId(currentUser.uid);
    }

    if (id) {
      fetchRecipe();
    }
  }, [id, currentUser]);

  const editRecipe = () => {
    navigate(`/recipes/edit/${id}`);
  };

  const deleteRecipe = async () => {
    if (id && window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await recipeService.deleteRecipe(id);
        console.log('Recipe deleted');
        navigate('/recipes');
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    }
  };

  return (
    <div className={styles.recipeDetail}>
      <h1 className="text-2xl font-bold">{recipe?.name}</h1>
      <p className="text-gray-600">{recipe?.description}</p>
      {recipe?.fileUrl && (
        <img
          src={recipe.fileUrl}
          alt={recipe?.name}
          className="mt-4 w-full h-40 object-cover rounded"
        />
      )}
      {currentUserId === recipe?.createdBy && (
        <div className="mt-4">
          <button
            onClick={editRecipe}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={deleteRecipe}
            className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
