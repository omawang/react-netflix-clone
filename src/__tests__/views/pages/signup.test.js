import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { FirebaseContext } from '../../../contexts/firebase';
import { Signup } from '../../../views/pages';

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useHistory: () => ({}),
// }));

describe('Signup page', () => {
  it('render Signup page', async () => {
    const firebase = {
      auth: () => ({
        createUserWithEmailAndPassword: () =>
          Promise.resolve({
            user: {
              updateProfile: jest.fn(() => {
                return Promise.resolve('Profile Updated');
              }),
            },
          }),
      }),
    };
    const {
      container,
      queryByTestId,
      getByPlaceholderText,
      getByTestId,
    } = render(
      <FirebaseContext.Provider value={{ firebase }}>
        <Router>
          <Signup />
        </Router>
      </FirebaseContext.Provider>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText('Name'), {
        target: { value: 'Awank' },
      });
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'awank@app.com' },
      });
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'secret' },
      });
      fireEvent.click(getByTestId('signup-submit'));

      expect(getByPlaceholderText('Name').value).toBe('Awank');
      expect(getByPlaceholderText('Email address').value).toBe('awank@app.com');
      expect(getByPlaceholderText('Password').value).toBe('secret');

      expect(queryByTestId('error')).toBeFalsy();
    });

    // expect(getByText('Sign In Now')).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('render Signup page failed submit', async () => {
    const firebase = {
      auth: jest.fn(() => ({
        createUserWithEmailAndPassword: jest.fn(() =>
          Promise.reject({ message: 'error!' })
        ),
      })),
    };
    const {
      container,
      queryByTestId,
      getByPlaceholderText,
      getByTestId,
    } = render(
      <FirebaseContext.Provider value={{ firebase }}>
        <Router>
          <Signup />
        </Router>
      </FirebaseContext.Provider>
    );

    await act(async () => {
      await fireEvent.change(getByPlaceholderText('Name'), {
        target: { value: 'Awank' },
      });
      await fireEvent.change(getByPlaceholderText('Email address'), {
        target: { value: 'awank' },
      });
      await fireEvent.change(getByPlaceholderText('Password'), {
        target: { value: 'secret' },
      });
      expect(getByPlaceholderText('Name').value).toBe('Awank');
      expect(getByPlaceholderText('Email address').value).toBe('awank');
      expect(getByPlaceholderText('Password').value).toBe('secret');
      fireEvent.click(getByTestId('signup-submit'));

      // expect(queryByTestId('error')).toBeTruthy();
    });

    // expect(getByText('Sign In Now')).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();
  });
});
