import React from 'react';

import * as S from './styles/profiles';

export default function Profiles({ children, ...restProps }) {
  return <S.Container {...restProps}>{children}</S.Container>;
}

Profiles.Title = function ProfilesTitle({ children, ...restProps }) {
  return <S.Title {...restProps}>{children}</S.Title>;
};

Profiles.List = function ProfilesList({ children, ...restProps }) {
  return <S.List {...restProps}>{children}</S.List>;
};

Profiles.Item = function ProfilesItem({ children, ...restProps }) {
  return <S.Item {...restProps}>{children}</S.Item>;
};

Profiles.Picture = function ProfilesPicture({ src, ...restProps }) {
  return (
    <S.Picture
      src={src ? `/images/users/${src}.png` : '/images/misc/loading.gif'}
      {...restProps}
    />
  );
};

Profiles.Name = function ProfilesName({ children, ...restProps }) {
  return <S.Name {...restProps}>{children}</S.Name>;
};
