import React from 'react';
import * as S from './styles/footer';

export default function Footer({ children, ...restProps }) {
  return <S.Container {...restProps}>{children}</S.Container>;
}

Footer.Row = function FooterRow({ children, ...restProps }) {
  return <S.Row {...restProps}>{children}</S.Row>;
};

Footer.Column = function FooterColumn({ children, ...restProps }) {
  return <S.Column {...restProps}>{children}</S.Column>;
};

Footer.Link = function FooterLink({ children, ...restProps }) {
  return <S.Link {...restProps}>{children}</S.Link>;
};

Footer.Title = function FooterTitle({ children, ...restProps }) {
  return <S.Title {...restProps}>{children}</S.Title>;
};

Footer.Text = function FooterText({ children, ...restProps }) {
  return <S.Text {...restProps}>{children}</S.Text>;
};

Footer.Break = function FooterBreak({ children, ...restProps }) {
  return <S.Break {...restProps}>{children}</S.Break>;
};
