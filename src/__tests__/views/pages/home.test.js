import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Home } from '../../../views/pages';

describe('Homepage', () => {
  it('render Home page', () => {
    const { container, getByText, getByTestId } = render(
      <Router>
        <Home />
      </Router>
    );

    expect(getByText('Unlimited films, TV programmes and more.')).toBeTruthy();
    expect(getByText('Watch anywhere. Cancel at any time.')).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();
  });
});
