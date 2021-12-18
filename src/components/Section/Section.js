import React from 'react';
import './Section.css';

const Section = ({
  children, mod, sectionTitleMod, sectionTitle, id,
}) => (
  <section className={`section ${mod}`} id={id}>
    <h2 className={`section__title ${sectionTitleMod}`}>{sectionTitle}</h2>
    {children}
  </section>
);

export default Section;
