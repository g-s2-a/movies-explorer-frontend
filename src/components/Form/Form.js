import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';


const Form = ({
  children, submitButtonMod = '', disabled, buttonText, caption = '', linkPath, linkText, linkMod = '', onSubmit, onSignOut
}) => (
  <form className="form" onSubmit={onSubmit}>
    {children}
    <button className={`form__submit-button ${submitButtonMod}`} disabled={disabled}>{buttonText}</button>
    <p className="form__caption">
      {caption}
      <Link to={linkPath} className={`form__link ${linkMod}`} onClick={onSignOut} >{linkText}</Link>
    </p>
  </form>
);

export default Form;
