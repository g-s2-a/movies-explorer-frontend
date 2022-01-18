import React, { Suspense } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Movies/Preloader/Preloader';


const Movies = (props) => (
  <>
    <Header>
      <Navigation onClick={props.onMenu}/>
    </Header>
    <SearchForm 
      onGetMovies={props.onGetMovies}
      onFilter={props.onFilter}
      isShortMovie={props.isShortMovie}
      searchBar={props.searchBar}
     />
    <Suspense fallback={<Preloader />}>
      <MoviesCardList 
          movies={props.movies}         
          onGetMovies={props.handleGetMovies}
          onAddMovie={props.onAddMovie}
          isSavedMovies={props.isSavedMovies}
          message={props.message}
          savedMovies={props.savedMovies}
          likedMovies={props.likedMovies}
          />
    </Suspense>
    <Footer />
    {props.isLoading && <Preloader />}
  </>
);


export default Movies;
