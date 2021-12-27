import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCBEirO1ZSPgaSGEHgL9U7Rcgq4A8qARRs',
  authDomain: 'findyourbank-a9f19.firebaseapp.com',
  projectId: 'findyourbank-a9f19',
  storageBucket: 'findyourbank-a9f19.appspot.com',
  messagingSenderId: '322993391720',
  appId: '1:322993391720:web:5d807e1bdc50bf597813dd',
};
initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export { db, auth };
