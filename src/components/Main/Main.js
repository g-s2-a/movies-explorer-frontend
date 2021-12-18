import React from 'react';
import Header from '../Header/Header';
import AuthNav from '../AuthNav/AuthNav';
import Navigation from '../Navigation/Navigation';
import Promo from '../Main/Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from '../Footer/Footer';

import './Main.css';

const isLoggedIn = false;

const Main = () => (
  <>
    <Header mod="header_section_main">
      {!isLoggedIn ? <AuthNav /> : <Navigation />}
    </Header>
    <Promo />
    <NavTab className="navTab" />
    <AboutProject />
    <Techs />
    <AboutMe>
      <Portfolio />
    </AboutMe>
    <Footer />
  </>
);

export default Main;
