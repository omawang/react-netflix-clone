import React from 'react';

import * as S from './styles/loading';

export default function Loading({ src, ...restProps }) {
  return (
    <S.Spinner {...restProps}>
      <S.LockBody />
      <S.Picture
        src={`/images/users/${src}.png`}
        data-testid="loading-picture"
      />
    </S.Spinner>
  );
}

Loading.ReleaseBody = function LoadingReleaseBody() {
  return <S.ReleaseBody />;
};
