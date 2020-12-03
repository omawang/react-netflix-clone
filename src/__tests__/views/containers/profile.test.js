import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

import { SelectProfileContainer } from '../../../views/containers/profile';

describe('<SelectProfileContainer />', () => {
  it('renders <SelectProfileContainer /> with populated data', () => {
    const user = { displayName: 'Awank', photoURL: '2' };
    const handleSelectProfile = jest.fn();
    const { container, getByTestId } = render(
      <Router>
        <SelectProfileContainer
          user={user}
          handleSelectProfile={handleSelectProfile}
        />
      </Router>
    );

    fireEvent.click(getByTestId('user-profile'));
    expect(handleSelectProfile).toHaveBeenCalled();

    expect(container.firstChild).toMatchSnapshot();
  });
});
