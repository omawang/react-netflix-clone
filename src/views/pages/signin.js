import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { FirebaseContext } from '../../contexts/firebase';
import { Form } from '../components';
import { FooterContainer } from '../containers/footer';
import { HeaderContainer } from '../containers/header';

import * as ROUTES from '../../constants/routes';

export default function Signin() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid = emailAddress === '' || password === '';

  const handleSignIn = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => {
        setEmailAddress('');
        setPassword('');
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In Now</Form.Title>
          {error && <Form.Error data-testid="error">{error}</Form.Error>}

          <Form.Base method="POST" onSubmit={handleSignIn}>
            <Form.Input
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />

            <Form.Input
              placeholder="Password"
              type="password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            <Form.Submit
              disabled={isInvalid}
              type="submit"
              data-testid="signin-submit"
            >
              Sign In
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            New to Netflix?{' '}
            <Form.Link to={ROUTES.SIGN_UP}>Sign up now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure you&apos;re not
            a bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>

      <FooterContainer />
    </>
  );
}
