import { useState } from 'react';
import { Button, Col, Row, Spin, Form, Input } from 'antd';

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
import './style.scss';
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
    let userFavBanks = [];
    event.preventDefault();
    signInWithEmailAndPassword(auth, 'test@gmail.com', 'password')
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
    <div className="signin_screen">
      <div className="signin_form_container">
        <Form name="basic" layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email',
              },
            ]}
          >
            <Input
              className="custom-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
              {
                min: 6,
                message: 'Password must be atleast 6 characters',
              },
            ]}
          >
            <Input.Password
              className="custom-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="button_container">
        <Button onClick={signIn}>Sign In</Button>
        <Button onClick={signInAsGuest}>Sign In as Guest</Button>
        <Button onClick={register}>Create Your Account</Button>{' '}
      </div>
    </div>
  );
}

export default SigninScreen;
