import React, { useState, useEffect, useContext } from "react";
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Section from '../Section/Section';
import Form from '../Form/Form';
import './Profile.css';

import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [changedName, setChangedName] = useState(false);
  const [changedEmail, setChangedEmail] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (currentUser.name !== undefined) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setChangedName(true);
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

  function handleEmailChange(e) {
    setChangedEmail(true);
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

  function changeInputDisabled() {
    setIsInputDisabled(!isInputDisabled);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditUser({
      name,
      email,
    });
    changeInputDisabled();
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError]);

  useEffect(() => {
    if (currentUser.name === name && currentUser.email === email) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [name, email, currentUser.name, currentUser.email]);
  return (
    <>
    <Header>
      <Navigation />
    </Header>
    <Section mod="profile" sectionTitleMod="profile__title" sectionTitle={`Привет, ${currentUser.name}!`}>
      <Form
        buttonText="Редактировать"
        submitButtonMod="form__submit-button_section_profile"
        linkPath="/"
        linkText="Выйти из аккаунта"
        linkMod="form__link_type_exit"
        onSubmit={handleSubmit}
        onSignOut={props.onSignOut}
        disabled={!formValid}
      >
        <fieldset className="form__fieldset form__fieldset_section_profile">
          <div className="form__input-container">
            <label className="form__label form__label_section_profile" htmlFor="name">Имя</label>
            <input className="form__input form__input_section_profile" id="name" required
              value={name}
              onChange={handleNameChange}
              disabled={!isInputDisabled} />
          </div>
          <span className="form__item-profile_error form__profile_span">
                {nameError}
          </span>
          <div className="form__input-container">
            <label className="form__label form__label_section_profile" htmlFor="email">Почта</label>
            <input type="email" className="form__input form__input_section_profile" id="email" required 
              value={email}
              onChange={handleEmailChange}
              disabled={!isInputDisabled}
            />
          </div>
          <span className="form__item-profile_error">{emailError}</span>
        </fieldset>
      </Form>
    </Section>
  </>
  );
}

export default Profile;
