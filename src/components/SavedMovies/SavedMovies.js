import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Movies/Preloader/Preloader';

const isLoading = false;

const SavedMovies = (props) => (
  <>
    <Header>
      <Navigation onClick={props.onMenu}/>
    </Header>
    <SearchForm 
      onGetMovies={props.onGetMovies}
      onFilter={props.onFilter}
      isShortMovie={props.isShortMovie}
     />
    <MoviesCardList 
             isSavedMovies={props.isSavedMovies}
             movies={props.movies}
             onGetMovies={props.onGetMovies}
             onDelete={props.onDelete}
             message={props.message} />
    <Footer />
    {isLoading && <Preloader />}
  </>
);

export default SavedMovies;
