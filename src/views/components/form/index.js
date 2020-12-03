import React from 'react';

import * as S from './styles/form';

export default function Form({ children, ...restProps }) {
  return <S.Container {...restProps}>{children}</S.Container>;
}

Form.Base = function FormBase({ children, ...restProps }) {
  return <S.Base {...restProps}>{children}</S.Base>;
};

Form.Title = function FormTitle({ children, ...restProps }) {
  return <S.Title {...restProps}>{children}</S.Title>;
};

Form.Error = function FormError({ children, ...restProps }) {
  return <S.Error {...restProps}>{children}</S.Error>;
};

Form.Text = function FormText({ children, ...restProps }) {
  return <S.Text {...restProps}>{children}</S.Text>;
};

Form.TextSmall = function FormTextSmall({ children, ...restProps }) {
  return <S.TextSmall {...restProps}>{children}</S.TextSmall>;
};

Form.Link = function FormLink({ children, ...restProps }) {
  return <S.Link {...restProps}>{children}</S.Link>;
};

Form.Input = function FormInput({ ...restProps }) {
  return <S.Input {...restProps} />;
};

Form.Submit = function FormSubmit({ children, ...restProps }) {
  return <S.Submit {...restProps}>{children}</S.Submit>;
};
