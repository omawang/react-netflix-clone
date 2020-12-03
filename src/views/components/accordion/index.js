import React, { createContext, useContext, useState } from 'react';
import * as S from './styles/accordion';

const ToggleContext = createContext();

export default function Accordion({ children, ...restProps }) {
  return (
    <S.Container {...restProps}>
      <S.Inner>{children}</S.Inner>
    </S.Container>
  );
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <S.Title {...restProps}>{children}</S.Title>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = useState(false);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <S.Item {...restProps}>{children}</S.Item>
    </ToggleContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { toggleShow, setToggleShow } = useContext(ToggleContext);

  return (
    <S.Header
      onClick={() => setToggleShow((toggleShow) => !toggleShow)}
      {...restProps}
    >
      {children}
      {toggleShow ? (
        <img src="/images/icons/close-slim.png" alt="Close" />
      ) : (
        <img src="/images/icons/add.png" alt="Open" />
      )}
    </S.Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { toggleShow } = useContext(ToggleContext);

  return toggleShow ? <S.Body {...restProps}>{children}</S.Body> : null;
};
