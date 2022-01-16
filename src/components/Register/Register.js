import React from 'react';
import Header from '../Header/Header';
import Section from '../Section/Section';
import Form from '../Form/Form';

import { Link } from "react-router-dom";

import "./Register.css";

function Register(props) {

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);

  function handleChangeName(e) {
    const validName = /^[a-zA-Z- ]+$/.test(e.target.value);

    if (e.target.value.length < 2) {
      setNameError("Длина имени должна быть не менее 2 символов");
    } else if (e.target.value.length > 30) {
      setNameError("Длина имени должна должна быть не более 30 символов");
    } else if (!validName) {
      setNameError("Имя должно быть указано латиницей");
    } else {
      setNameError("");
    }
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(e.target.value);

    if (!validEmail) {
      setEmailError("Неверный формат почты");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    if (e.target.value.length < 6) {
      setPasswordError("Пароль должен быть не менее 6 символов");
    } else {
      setPasswordError("");
    }
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(name, email, password);
  }

  React.useEffect(() => {
    if (
      name &&
      email &&
      password &&
      !nameError &&
      !emailError &&
      !passwordError
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, email, password, nameError, emailError, passwordError]);

  return (
  <>
    <Header mod="header_section_auth" />
    <Section mod="section_type_auth" sectionTitle="Добро пожаловать!" sectionTitleMod="section__title_type_auth">
      <Form
        buttonText="Зарегистрироваться"
        disabled={!formValid}
        caption="Уже зарегистрированы? "
        linkPath="/signin"
        linkText="Войти"
        onSubmit={handleSubmit}
      >
        <fieldset className="form__fieldset">

          <label className="form__label" htmlFor="name">Имя</label>
          <input className="form__input" id="name" required type="text" value={name} onChange={handleChangeName} />
          <span id="name-error" className="form__error">{nameError}</span>
          
          <label className="form__label" htmlFor="email">E-mail</label>
          <input type="email" className="form__input" id="email" required value={email} onChange={handleChangeEmail}/>
          <span id="name-error" className="form__error">{emailError}</span>
          
          <label className="form__label" htmlFor="password">Пароль</label>
          <input type="password" className="form__input form__input_with-error" id="password" required value={password} onChange={handleChangePassword} />
          <span id="about-error" className="form__error">{passwordError}</span>

        </fieldset>
      </Form>
    </Section>
  </>
  );
}

export default Register;
