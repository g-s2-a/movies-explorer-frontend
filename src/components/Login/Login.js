import React from 'react';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Form from '../Form/Form';

const Login = () => (
  <>
    <Header mod="header_section_auth" />
    <Section mod="section_type_auth" sectionTitle="Рады видеть!" sectionTitleMod="section__title_type_auth">
      <Form
        buttonText="Войти"
        caption="Еще не зарегистрированы? "
        linkPath="/signup"
        linkText="Регистрация"
      >
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="email">E-mail</label>
          <input type="email" className="form__input" id="email" required defaultValue="email@ya.ru" />
          <label className="form__label" htmlFor="password">Пароль</label>
          <input type="password" className="form__input" id="password" required />
        </fieldset>
      </Form>
    </Section>
  </>
);

export default Login;
