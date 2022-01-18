import React from 'react';
import Section from '../Section/Section';
import Tech from '../Main/Tech/Tech';
import './Techs.css';

const techs = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

const Techs = () => (
  <Section mod="techs" sectionTitleMod="techs__title" sectionTitle="Технологии" id="technologies">
    <h3 className="techs__subtitle">7 технологий</h3>
    <p className="techs__txt">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте</p>
    <ul className="techs__list">
      {techs.map((tech, index) => (
        <li className="techs__list-item" key={index}>
          <Tech tech={tech} />
        </li>
      ))}
    </ul>
  </Section>
);

export default Techs;
