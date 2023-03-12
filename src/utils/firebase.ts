import {FirebaseError, initializeApp} from 'firebase/app';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {
  getAuth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore';
import {Sex} from '../routes/sign-up/sign-up.route';

const firebaseConfig = {
  apiKey: 'AIzaSyDY3AitGhUBZ2H31IPH1Guq3V-Mp8K-8OI',
  authDomain: 'registration2-f743e.firebaseapp.com',
  projectId: 'registration2-f743e',
  storageBucket: 'registration2-f743e.appspot.com',
  messagingSenderId: '341877804508',
  appId: '1:341877804508:web:1161b0b61b4bdda5a11319',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(app);

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('Email address is already in use.');
          break;
        case 'auth/invalid-email':
          alert('Email address is not valid.');
          break;
        case 'auth/weak-password':
          alert('Password is too weak.');
          break;
        default:
          console.log('Error creating user:', error.message);
      }
    } else {
      console.log('User creation error:', error);
    }
  }
};

export const CreateUserDocumentFromAuth = async (
  userAuth: UserCredential['user'],
  username: string,
  sex: Sex,
  dateOfBirth: string,
  profileIcon: string,
  termsOfUse: boolean
) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const {email} = userAuth;
    const createdAt = new Date();
    const user = {
      email: email,
      username,
      sex,
      dateOfBirth,
      profileIcon,
      termsOfUse,
      createdAt: createdAt,
    };
    try {
      await setDoc(userDocRef, user);
    } catch (error) {
      console.log('there was an error creating user');
    }
    return userDocRef;
  }
};

export const uploadImage = async (
  image: File,
  folder: string,
  filename: string
) => {
  if (!image.type.startsWith('image/')) return false;
  try {
    const imageRef = ref(storage, `${folder}/${filename}`);
    const response = await uploadBytes(imageRef, image);
    console.log(response);
    return await getDownloadURL(response.ref);
  } catch (error) {
    console.log(error);
  }
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    alert('You must provide an email and password');
    return null;
  }
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response) {
      return response;
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password');
          break;
        case 'auth/user-not-found':
          alert('User not found');
          break;
        default:
          console.log('user sign in failed', error.message);
      }
    } else {
      console.log('user sign in failed', error);
    }
  }
};

export const signOutUser = async () => signOut(auth);
