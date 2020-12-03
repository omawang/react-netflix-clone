import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import * as S from './styles/header';

export default function Header({ bg = true, src, children, ...restProps }) {
  return bg ? (
    <S.Background src={src} {...restProps}>
      {children}
    </S.Background>
  ) : (
    children
  );
}

Header.Frame = function HeaderFrame({ children, ...restProps }) {
  return <S.Container {...restProps}>{children}</S.Container>;
};

Header.Group = function HeaderGroup({ children, ...restProps }) {
  return <S.Group {...restProps}>{children}</S.Group>;
};

Header.Search = function HeaderSearch({
  searchTerm,
  setSearchTerm,
  children,
  ...restProps
}) {
  const [active, setActive] = useState(false);
  return (
    <S.Search {...restProps}>
      <S.SearchIcon
        onClick={() => setActive((active) => !active)}
        data-testid="search-click"
      >
        <img src="/images/icons/search.png" alt="Search" />
      </S.SearchIcon>
      <S.SearchInput
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Search films and series"
        active={active}
        data-testid="search-input"
      />
    </S.Search>
  );
};

Header.Logo = function HeaderLogo({ to, src, ...restProps }) {
  return (
    <ReactRouterLink to={to}>
      <S.Logo src={src} data-testid="header-bg" {...restProps} />
    </ReactRouterLink>
  );
};

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }) {
  return <S.ButtonLink {...restProps}>{children}</S.ButtonLink>;
};

Header.TextLink = function HeaderTextLink({ children, ...restProps }) {
  return <S.TextLink {...restProps}>{children}</S.TextLink>;
};

Header.Profile = function HeaderProfile({ children, ...restProps }) {
  return <S.Profile {...restProps}>{children}</S.Profile>;
};

Header.Dropdown = function HeaderDropdown({ children, ...restProps }) {
  return <S.Dropdown {...restProps}>{children}</S.Dropdown>;
};

Header.Picture = function HeaderPicture({ src, ...restProps }) {
  return <S.Picture src={`/images/users/${src}.png`} {...restProps} />;
};

Header.Feature = function HeaderFeature({ children, ...restProps }) {
  return <S.Feature {...restProps}>{children}</S.Feature>;
};

Header.FeatureCallOut = function HeaderFeatureCallOut({
  children,
  ...restProps
}) {
  return <S.FeatureCallOut {...restProps}>{children}</S.FeatureCallOut>;
};

Header.Text = function HeaderText({ children, ...restProps }) {
  return <S.Text {...restProps}>{children}</S.Text>;
};

Header.PlayButton = function HeaderPlayButton({ children, ...restProps }) {
  return <S.PlayButton {...restProps}>{children}</S.PlayButton>;
};
