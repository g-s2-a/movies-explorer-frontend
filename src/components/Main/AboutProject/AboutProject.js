import React from 'react';
import Section from '../../Section/Section';
import './AboutProject.css';

const AboutProject = () => (
  <Section mod="about-project" sectionTitleMod="about-project__title" sectionTitle="О проекте" id="about-project">
    <div className="about-project__two-columns">
      <div className="about-project__column">
        <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__txt">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className="about-project__column">
        <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__txt">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
    </div>
    <div className="about-project__two-columns">
      <div className="about-project__left-column">
        <div className="about-project__diagram about-project__diagram_backend">1 неделя</div>
        <p className="about-project__diagram-caption">Back-end</p>
      </div>
      <div className="about-project__right-column">
        <div className="about-project__diagram about-project__diagram_frontend">4 недели</div>
        <p className="about-project__diagram-caption">Front-end</p>
      </div>
    </div>
  </Section>
);

export default AboutProject;
