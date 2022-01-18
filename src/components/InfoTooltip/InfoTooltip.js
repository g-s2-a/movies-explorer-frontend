import React from 'react';
import './InfoTooltip.css';

const InfoTooltip = ({
  image, message, isOpen, setIsOpen,
}) => {
  const closePopup = () => {
    setIsOpen(false);
  };

  const handleLayoutClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup();
    }
  };

  const handleEscapeTap = (evt) => {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keyup', handleEscapeTap);

    return () => {
      document.removeEventListener('keyup', handleEscapeTap);
    };
  });

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} onClick={handleLayoutClick}>
    <div className="popup__block">
      <img className="popup__img" src={image} alt="Ошибка при совершении запроса" />
      <h2 className="popup__title">{message}</h2>
      <p className="popup__txt">{message}</p>
      <button className="popup__close-button" onClick={closePopup}/>
    </div>
    </div>
  );
};

export default InfoTooltip;
