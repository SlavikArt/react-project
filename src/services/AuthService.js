import { auth } from '../firebase-config';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

class AuthService {
  constructor() {
    this.auth = auth;
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  async logout() {
    return signOut(this.auth);
  }

  getCurrentUser(callback) {
    const unsubscribe = onAuthStateChanged(this.auth, (user) => {
      callback(user);
    });

    return unsubscribe;
  }
}

export default new AuthService();
