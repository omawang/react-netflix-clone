import React, { createContext, useContext, useState } from 'react';

import * as S from './styles/card';

export const FeatureContext = createContext();

export default function Card({ children, ...restProps }) {
  const [showFeature, setShowFeature] = useState(false);
  const [itemFeature, setItemFeature] = useState({});

  return (
    <FeatureContext.Provider
      value={{ showFeature, setShowFeature, itemFeature, setItemFeature }}
    >
      <S.Container {...restProps}>{children}</S.Container>
    </FeatureContext.Provider>
  );
}

Card.Group = function CardGroup({ children, ...restProps }) {
  return <S.Group {...restProps}>{children}</S.Group>;
};

Card.Title = function CardTitle({ children, ...restProps }) {
  return <S.Title {...restProps}>{children}</S.Title>;
};

Card.Entities = function CardEntities({ children, ...restProps }) {
  return <S.Entities {...restProps}>{children}</S.Entities>;
};

Card.Item = function CardItem({ item, children, ...restProps }) {
  const { setShowFeature, setItemFeature } = useContext(FeatureContext);

  return (
    <S.Item
      onClick={() => {
        setItemFeature(item);
        setShowFeature(true);
      }}
      {...restProps}
    >
      {children}
    </S.Item>
  );
};

Card.Image = function CardImage({ src, ...restProps }) {
  return <S.Image src={src} {...restProps} />;
};

Card.Meta = function CardMeta({ children, ...restProps }) {
  return <S.Meta {...restProps}>{children}</S.Meta>;
};

Card.SubTitle = function CardSubTitle({ children, ...restProps }) {
  return <S.SubTitle {...restProps}>{children}</S.SubTitle>;
};

Card.Text = function CardText({ children, ...restProps }) {
  return <S.Text {...restProps}>{children}</S.Text>;
};

Card.Feature = function CardFeature({ category, children, ...restProps }) {
  const { showFeature, itemFeature, setShowFeature } = useContext(
    FeatureContext
  );

  return showFeature ? (
    <S.Feature
      src={`/images/${category}/${itemFeature.genre}/${itemFeature.slug}/large.jpg`}
      {...restProps}
    >
      <S.FeatureContent>
        <S.FeatureTitle>{itemFeature.title}</S.FeatureTitle>
        <S.FeatureText>{itemFeature.description}</S.FeatureText>
        <S.FeatureClose onClick={() => setShowFeature(false)}>
          <img src="/images/icons/close.png" alt="Close" />
        </S.FeatureClose>

        <S.Group margin="30px 0" flexDirection="row" alignItems="center">
          <S.Maturity rating={itemFeature.maturity}>
            {itemFeature.maturity < 12 ? 'PG' : itemFeature.maturity}
          </S.Maturity>
          <S.FeatureText fontWeight="bold">
            {itemFeature.genre.charAt(0).toUpperCase() +
              itemFeature.genre.slice(1)}
          </S.FeatureText>
        </S.Group>
        {children}
      </S.FeatureContent>
    </S.Feature>
  ) : null;
};
