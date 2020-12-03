import React from 'react';
import { render } from '@testing-library/react';
import { Profiles } from '../../../views/components';

describe('<Profile />', () => {
  it('renders the <Profile /> component with populated data', () => {
    const { container, getByText, getByTestId } = render(
      <Profiles>
        <Profiles.Title>Who&apos;s watching</Profiles.Title>
        <Profiles.List>
          <Profiles.Item onClick={() => {}}>
            <Profiles.Picture
              src="/images/awank.png"
              data-testid="profile-picture"
            />
            <Profiles.Name>Awank</Profiles.Name>
          </Profiles.Item>
        </Profiles.List>
      </Profiles>
    );

    expect(getByText("Who's watching")).toBeTruthy();
    expect(getByTestId('profile-picture')).toBeTruthy();
    expect(getByText('Awank')).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the <Profile /> component with populated data but misc profile image', () => {
    const { container, getByText, getByTestId } = render(
      <Profiles>
        <Profiles.Title>Who&apos;s watching</Profiles.Title>
        <Profiles.List>
          <Profiles.Item onClick={() => {}}>
            <Profiles.Picture data-testid="profile-picture-misc" />
            <Profiles.Name>Awank</Profiles.Name>
          </Profiles.Item>
        </Profiles.List>
      </Profiles>
    );

    expect(getByText("Who's watching")).toBeTruthy();
    expect(getByTestId('profile-picture-misc')).toBeTruthy();
    expect(getByText('Awank')).toBeTruthy();

    expect(container.firstChild).toMatchSnapshot();
  });
});
