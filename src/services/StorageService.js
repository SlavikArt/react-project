import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase-config';

class StorageService {
  async uploadRecipe(file, path) {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
}

export default new StorageService();
