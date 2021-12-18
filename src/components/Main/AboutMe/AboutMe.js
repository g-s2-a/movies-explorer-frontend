import React from 'react';
import Section from '../../Section/Section';
import './AboutMe.css';
import photo from '../../../images/photo.png';
import { facebook, github } from '../../../utils/links';

const AboutMe = ({ children }) => (
  <Section mod="about-me" sectionTitleMod="about-me__title" sectionTitle="Студент" id="student">
    <div className="about-me__two-columns">
      <div className="about-me__left-column">
        <div className="about-me__student-info-container">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__summary">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
          После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
        </div>
        <ul className="about-me__list">
          <li className="about-me__list-item">
            <a target="_blank" rel="noopener noreferrer" className="about-me__link" href={facebook}>Facebook</a>
          </li>
          <li className="about-me__list-item">
            <a target="_blank" rel="noopener noreferrer" className="about-me__link" href={github}>Github</a>
          </li>
        </ul>
      </div>
      <div className="about-me__right-column">
        <img className="about-me__img" src={photo} alt="Фото студента" />
      </div>
    </div>
    {children}
  </Section>
);

export default AboutMe;
