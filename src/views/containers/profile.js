import React from 'react';

import { Header, Profiles } from '../components';
import * as ROUTES from '../../constants/routes';
import logo from '../../logo.svg';

export function SelectProfileContainer({ user, handleSelectProfile }) {
  return (
    <>
      <Header bg={false}>
        <Header.Frame>
          <Header.Logo src={logo} to={ROUTES.HOME} alt="Netflix" />
        </Header.Frame>
      </Header>

      <Profiles>
        <Profiles.Title>Who&apos;s watching</Profiles.Title>
        <Profiles.List>
          <Profiles.Item
            data-testid="user-profile"
            onClick={() =>
              handleSelectProfile({
                displayName: user.displayName,
                photoURL: user.photoURL,
              })
            }
          >
            <Profiles.Picture src={user.photoURL} />
            <Profiles.Name>{user.displayName}</Profiles.Name>
          </Profiles.Item>
        </Profiles.List>
      </Profiles>
    </>
  );
}
