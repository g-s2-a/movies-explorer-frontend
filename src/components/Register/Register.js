import React from 'react';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Form from '../Form/Form';

const Register = () => (
  <>
    <Header mod="header_section_auth" />
    <Section mod="section_type_auth" sectionTitle="Добро пожаловать!" sectionTitleMod="section__title_type_auth">
      <Form
        buttonText="Зарегистрироваться"
        caption="Уже зарегистрированы? "
        linkPath="/signin"
        linkText="Войти"
      >
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="name">Имя</label>
          <input className="form__input" id="name" required minLength={2} maxLength={30} defaultValue="Виталий" />
          <label className="form__label" htmlFor="email">E-mail</label>
          <input type="email" className="form__input" id="email" required defaultValue="pochta@yandex.ru|" />
          <label className="form__label" htmlFor="password">Пароль</label>
          <input type="password" className="form__input form__input_with-error" id="password" required defaultValue="11111111" />
          <span className="form__error">Что-то пошло не так</span>
        </fieldset>
      </Form>
    </Section>
  </>
);

export default Register;
