import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useMyContext } from '../../utility/contextProvider/myContext';

const auth = getAuth();

function SigninScreen() {
  const { setIsLoggedIn } = useMyContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        setIsLoggedIn(true);
      })
      .catch((error) => alert(error.message));
  };

  const signInAsGuest = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, 'test@gmail.com', 'password')
      .then((auth) => {
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
