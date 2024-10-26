import { db } from '../firebase-config';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

class RecipeService {
  constructor() {
    this.recipesCollectionRef = collection(db, 'recipes');
  }

  async getRecipes() {
    const recipeSnapshot = await getDocs(this.recipesCollectionRef);
    const recipeList = recipeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return recipeList;
  }

  async getRecipe(id) {
    const recipeDocRef = doc(db, 'recipes', id);
    const recipeDoc = await getDoc(recipeDocRef);
    return recipeDoc.exists() ? { id: recipeDoc.id, ...recipeDoc.data() } : null;
  }

  async addRecipe(recipe) {
    const newDocRef = await addDoc(this.recipesCollectionRef, recipe);
    return newDocRef.id;
  }

  async updateRecipe(id, updatedData) {
    const recipeDocRef = doc(db, 'recipes', id);
    await updateDoc(recipeDocRef, updatedData);
  }

  async deleteRecipe(id) {
    const recipeDocRef = doc(db, 'recipes', id);
    await deleteDoc(recipeDocRef);
  }
}

const recipeService = new RecipeService();
export default recipeService;
