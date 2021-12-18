import React from 'react';
import { Link } from 'react-router-dom';
import './Form.css';


const Form = ({
  children, submitButtonMod = '', buttonText, caption = '', linkPath, linkText, linkMod = '',
}) => (
  <form className="form">
    {children}
    <button className={`form__submit-button ${submitButtonMod}`}>{buttonText}</button>
    <p className="form__caption">
      {caption}
      <Link to={linkPath} className={`form__link ${linkMod}`}>{linkText}</Link>
    </p>
  </form>
);

export default Form;
