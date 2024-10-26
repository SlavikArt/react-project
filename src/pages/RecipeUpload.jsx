import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import recipeService from '../services/RecipeService';
import storageService from '../services/StorageService';
import styles from './RecipeUpload.module.css';

const RecipeUpload = () => {
  const [recipeForm, setRecipeForm] = useState({ name: '', description: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const { currentUser } = useAuth();
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(recipeForm.name && recipeForm.description && selectedFile);
  }, [recipeForm, selectedFile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const submitRecipe = async (event) => {
    event.preventDefault();

    if (formValid && currentUser) {
      const path = `recipes/${selectedFile.name}`;
      try {
        const fileUrl = await storageService.uploadRecipe(selectedFile, path);
        const recipeData = {
          name: recipeForm.name,
          description: recipeForm.description,
          createdBy: currentUser.uid,
          username: currentUser.displayName,
          fileUrl,
        };
        await recipeService.addRecipe(recipeData);
        console.log('Recipe successfully uploaded and saved!');
        setRecipeForm({ name: '', description: '' });
        setSelectedFile(null);
      } catch (error) {
        console.error('Error during recipe upload or save:', error);
      }
    } else {
      console.log('Form is invalid or no file selected.');
    }
  };

  return (
    <div className={styles.recipeDetail}>
      <h1 className="text-2xl font-bold mb-4">Add New Recipe</h1>
      <form onSubmit={submitRecipe}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Recipe Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={recipeForm.name}
            onChange={handleChange}
            className="border p-2 w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={recipeForm.description}
            onChange={handleChange}
            className="border p-2 w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Select Recipe File (Image)</label>
          <input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="border p-2 w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          disabled={!formValid}
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeUpload;
