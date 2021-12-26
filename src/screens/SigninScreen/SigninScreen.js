import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useMyContext } from '../../utility/contextProvider/myContext';
import { db } from '../../firebase';

const auth = getAuth();

function SigninScreen() {
  const { setIsLoggedIn, setUserData } = useMyContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async (event) => {
    event.preventDefault();
    let userFavBanks = [];
    signInWithEmailAndPassword(auth, email, password)
      .then(async (auth) => {
        setIsLoggedIn(true);

        const userFavRef = doc(db, 'users', auth.user.uid);
        const docSnap = await getDoc(userFavRef);
        if (docSnap.exists()) {
          userFavBanks = JSON.parse(docSnap.data().favorites);
        }
        setUserData({ details: auth.user, favorites: userFavBanks });
      })
      .catch((error) => alert(error.message));
  };

  const signInAsGuest = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, 'test@gmail.com', 'password')
      .then(async (auth) => {
        setIsLoggedIn(true);
      })
      .catch((error) => alert(error.message));
  };

  const register = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          setIsLoggedIn(true);
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="login_singInButton" onClick={signIn} type="submit">
            Sign In
          </button>
          <button
            className="login_singInButton"
            onClick={signInAsGuest}
            type="submit"
          >
            Sign In as Guest
          </button>
          <p>
            By continuing, you agree to Groww's Conditions of Use and Privacy
            Notice.
          </p>
          <button className="login_registerButton" onClick={register}>
            Create your account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SigninScreen;
