import React, { useState, useEffect } from "react";
import Header from '../Header/Header';
import Section from '../Section/Section';
import Form from '../Form/Form';

import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  function handleChangeEmail(e) {
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      e.target.value
    );

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
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  }

  useEffect(() => {
    if (props.loggedIn) {
      setEmail("");
      setPassword("");
    }
  }, [props.loggedIn]);

  React.useEffect(() => {
    if (email && password && !emailError && !passwordError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email, password, emailError, passwordError]);

  return (
    <>
    <Header mod="header_section_auth" />
    <Section mod="section_type_auth" sectionTitle="Рады видеть!" sectionTitleMod="section__title_type_auth">
      <Form
        buttonText="Войти"
        caption="Еще не зарегистрированы? "
        linkPath="/signup"
        linkText="Регистрация"
        onSubmit={handleSubmit}
        submitButtonMod=""
        disabled={!formValid}
      >
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="email">E-mail</label>
          <input 
            className="form__input"             
            type="email"
            value={email}
            onChange={handleChangeEmail}
            required />
          <label className="form__label" htmlFor="password">Пароль</label>
          <input 
            type="password" 
            className="form__input"
            id="password" 
            value={password}
            onChange={handleChangePassword}
            required />
        </fieldset>
      </Form>
    </Section>
  </>
  );
}

export default Login;
