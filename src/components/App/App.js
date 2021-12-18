import React from 'react';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';

import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { Switch, Route } from 'react-router-dom';
import WrongPath from '../WrongPath/WrongPath';


const App = () => (
  <>
    <Switch>

      <Route exact path="/">
        <Main />
      </Route>

      <Route path="/signin">
        <Login />
      </Route>

      <Route path="/signup">
        <Register />
      </Route>

      <Route path="/movies">
        <Movies />
      </Route>

      <Route path="/saved-movies">
        <SavedMovies />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>

      <Route path='*'>
        <WrongPath />
      </Route>

    </Switch>

    <InfoTooltip />
  </>
);

export default App;