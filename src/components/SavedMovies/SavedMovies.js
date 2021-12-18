import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Movies/Preloader/Preloader';
import { defMoviesShort } from '../../utils/defMovies';

const isLoading = false;

const SavedMovies = () => (
  <>
    <Header>
      <Navigation />
    </Header>
    <SearchForm />
    <MoviesCardList movies={defMoviesShort} isRemovable />
    <Footer />
    {isLoading && <Preloader />}
  </>
);

export default SavedMovies;
