import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { FirebaseContext } from '../../../contexts/firebase';
import { Signin } from '../../../views/pages';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({}),
}));

const firebase = {
  auth: () => ({
    signInWithEmailAndPassword: jest.fn(() => {
      return Promise.resolve('I am signed in!');
    }),
  }),
};

describe('Signin page', () => {
  it('render Signin page', async () => {
    const {
      container,
      queryByTestId,
      getByPlaceholderText,
      getByTestId,
    } = render(
      <FirebaseContext.Provider value={{ firebase }}>
        <Router>
          <Signin />
        </Router>
      </FirebaseContext.Provider>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'awank@app.com' },
      });
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'secret' },
      });
      fireEvent.click(getByTestId('signin-submit'));

      expect(getByPlaceholderText('Email address').value).toBe('awank@app.com');
      expect(getByPlaceholderText('Password').value).toBe('secret');

      expect(queryByTestId('error')).toBeFalsy();
    });

    // expect(getByText('Sign In Now')).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();
  });
});
