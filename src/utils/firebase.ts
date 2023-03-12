import {initializeApp} from 'firebase/app';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import {
  getAuth,
  UserCredential,
  createUserWithEmailAndPassword,
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
    console.log(error);
    return;
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