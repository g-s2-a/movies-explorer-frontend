import React  from 'react';

import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';

import mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";

import Main from '../Main/Main';

import Movies from '../Movies/Movies';

import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { Switch, Route, useHistory, useLocation,Redirect } from 'react-router-dom';
import WrongPath from '../WrongPath/WrongPath';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { MAX_SHORT_MOVIE_DORATION } from "../../utils/config";
import errorImg from '../../images/error.png';
import successImg from '../../images/green-tick.png';



function App() {

  const history = useHistory();


  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser]   = React.useState({ name: '', email: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [sortedMovies, setSortedMovies] = React.useState([]);
  const [isFormDisabled, setIsFormDisabled] = React.useState(false);

  const [movies, setMovies] = React.useState([]);
  const [userMovies, setUserMovies] = React.useState([]);
  const [shortMovies, setShortMovies] = React.useState(JSON.parse(localStorage.getItem("shortMovies")));
  const [moviesMessage, setMoviesMessage] = React.useState("");

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const showError = (msg) => {
    setMessage(msg);
    setInfoTooltipImage(errorImg);
    setIsInfoTooltipOpen(true);
  };

  const showSuccess = (msg) => {
    setMessage(msg);
    setInfoTooltipImage(successImg);
    setIsInfoTooltipOpen(true);
  };

  //const [searchBar, setSearchBar] = React.useState("");
  
  
  let location = useLocation();

  React.useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            getCurrentUser();
            setCurrentUser(res);
            history.push(path);
          }
        })
        .catch((err) => {
          console.log(`Не верный, или старый токен: ${err}`);
          localStorage.removeItem("jwt");
          history.push("/");
        });
    }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // регистрация
  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          setMessage("");
          handleLogin(email, password);
          setLoggedIn(true);
          setCurrentUser(res);
        }
      })
      .catch((err) => {
        if (err === 409) {
          showError("Пользователь с таким email уже существует");
        } else {
          showError("При регистрации пользователя произошла ошибка");
        }
      });
  }

  // авторизация
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          showError("Что-то пошло не так");
          return false;
        }
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setMessage("");
          setLoggedIn(true);
          getCurrentUser();
          history.push("/movies");
          return loggedIn;
        }
      })
      .catch((err) => {
        showError("При авторизации произошла ошибка");
        if (err === 401) {
          showError("Пользователь с таким email не найден");
        }
        if (err === 400) {
          showError("Неверный email или пароль");
        }
        localStorage.removeItem("jwt");
      });
  }

  // обновление профиля
  function handleUpdateUser(data) {



    mainApi
      .editUserInfo(data)
      .then((editedData) => {
        setCurrentUser(editedData);
        showSuccess("Данные профиля успешно обновлены");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        if (err.status === 409) {
          showError("Пользователь с таким email уже существует");
        } else {
          showError("При изменении данных профиля произошла ошибка");
        }
      });
  }

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userMovies");
    localStorage.removeItem("movies");
    localStorage.removeItem("sortedMovies");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("searchBar");
    localStorage.removeItem("shortMovies");
    
    setUserMovies([]);
    setSortedMovies([]);
    setCurrentUser({});
    setLoggedIn(false);
    setMessage("");
    history.push("/");
  };

  //получить пользователя
  function getCurrentUser() {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .getUserData(jwt)
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          localStorage.setItem("currentUser", JSON.stringify(userData));
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("jwt");
        localStorage.removeItem("currentUser");
      });
  }


  function handleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen();
  }

  // поиск фильмов
  const handleGetMovies = async (keyword) => {
    setIsLoading(true);
    try {

      setMoviesMessage("");
      const key = new RegExp(keyword, "gi");
      const findedMovies = movies.filter(
        (item) => key.test(item.nameRU) || key.test(item.nameEN)
      );

      if (findedMovies.length === 0) {
        setMoviesMessage("Ничего не найдено");
      } else {
        setMoviesMessage("");
        const checkedLikes = findedMovies.map((movie) => {
          movie.isSaved = userMovies.some(
            (userMovie) => userMovie.movieId === movie.id
          );
          return movie;
        });
        setSortedMovies(checkedLikes);
        localStorage.setItem("sortedMovies", JSON.stringify(checkedLikes));
        localStorage.setItem("searchBar", keyword);
      }
    } catch (err) {
      showError("Ошибка при поиске фильмов");
    } finally {
      setIsLoading(false);
    }
  };

  function handleMovieDeleteButton(movie) {
    handleDislikeClick(movie);
  }

  function handleGetSavedMovies(keyword) {
    setMoviesMessage("");
    const key = new RegExp(keyword, "gi");
    const findedMovies = userMovies.filter(
      (item) => key.test(item.nameRU) || key.test(item.nameEN)
    );
    if (findedMovies.length === 0) {
      setMoviesMessage("Ничего не найдено");
    } else {
      setMoviesMessage("");
      setUserMovies(findedMovies);
    }
  }

	function handleLikeChange(movie) {
    const clickedMovie = movie.isSaved;
    if (clickedMovie) {
      handleDislikeClick(movie);
    } else {
      handleLikeClick(movie);
    }
  }

  function handleLikeClick(movie) {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .addMovie(movie, jwt)
      .then((newMovie1) => {
        if (!newMovie1) {
          throw new Error("При добавлении фильма произошла ошибка");
        } else {
          localStorage.setItem(
            "userMovies",
            JSON.stringify((newMovie1 = [newMovie1, ...userMovies]))
          );
          setUserMovies(newMovie1);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleDislikeClick(movie) {
		const jwt = localStorage.getItem("jwt");
    const movieId = movie.id || movie.movieId;
    const selectedMovie = userMovies.find((item) => item.movieId === movieId);
    mainApi
      .deleteMovie(selectedMovie._id, jwt)
      .then((deletedMovie) => {
        if (!deletedMovie) {
          throw new Error("При удалении фильма произошла ошибка");
        } else {
          const newMoviesList = userMovies.filter((c) => c.movieId !== movieId);
          setUserMovies(newMoviesList);
        }
      })
      .catch((err) => console.log(`При удалении фильма: ${err}`));
  }

  function handleCheckBox() {
    localStorage.setItem("shortMovies",!shortMovies);    
    setShortMovies(!shortMovies);
  }


  // фильтрация короткомтражных фильмов
  function filterShortMovies(arr) {
    if (arr.length !== 0 || arr !== "undefind") {
      return arr.filter((movie) =>
        shortMovies ? movie.duration <= MAX_SHORT_MOVIE_DORATION : true
      );
    }
	}

  function checkSavedMovie(movie) {
    return (movie.isSaved = userMovies.some(
      (userMovie) => userMovie.movieId === movie.id
    ));
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null) {
      Promise.all([mainApi.getUserData(jwt), mainApi.getUserMovies(jwt)])
        .then(([userData, savedMovies]) => {
          localStorage.setItem("currentUser", JSON.stringify(userData));
          setCurrentUser(userData);

          const savedMoviesList = savedMovies.filter(
            (item) => item.owner === userData._id
          );
          localStorage.setItem("userMovies", JSON.stringify(savedMoviesList));
          setUserMovies(savedMoviesList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    localStorage.getItem("sortedMovies") && setSortedMovies(JSON.parse(localStorage.getItem("sortedMovies")));
  }, []);

  React.useEffect(() => {
    checkSavedMovie(sortedMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMovies]);

  React.useEffect(() => {
    moviesApi
      .getInitialMovies()
      .then((allMovies) => {
        setMovies(allMovies);
        localStorage.setItem("movies", JSON.stringify(allMovies));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        localStorage.removeItem("movies");
      });
  }, [loggedIn]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>

        <Route exact path="/">
          <Main loggedIn={loggedIn} onMenu={handleMenu}/>
        </Route>

        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          onMenu={handleMenu}
          onFilter={handleCheckBox}
          isShortMovie={shortMovies}
          message={moviesMessage}
          savedMovies={userMovies}
          onSignOut={handleSignOut}
          likedMovies={checkSavedMovie}
          movies={filterShortMovies(sortedMovies)}
          searchBar = {localStorage.getItem("searchBar")}
          onGetMovies={handleGetMovies}
          onAddMovie={handleLikeChange}
          isLoading={isLoading}
        />

        <Route path="/signin">
          {!loggedIn
              ? <Login onLogin={handleLogin} loggedIn={loggedIn} message={message} /> : <Redirect to="/movies" />
            }
        </Route>

        <Route path="/signup">
          {!loggedIn
              ? <Register onRegister={handleRegister} message={message} /> : <Redirect to="/movies" />
            }
        </Route>

        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          onMenu={handleMenu}
          movies={filterShortMovies(userMovies)}
          isShortMovie={shortMovies}
          onFilter={handleCheckBox}
          message={moviesMessage}
          isSavedMovies={true}
          onSignOut={handleSignOut}
          onGetMovies={handleGetSavedMovies}
          onDelete={handleMovieDeleteButton}

        />

        <ProtectedRoute
          path="/profile"
          component={Profile}
          loggedIn={loggedIn}
          message={message}
          onSignOut={handleSignOut}
          onEditUser={handleUpdateUser}
          onMenu={handleMenu}
          isFormDisabled={isFormDisabled}
        />

        <Route path='*'>
          <WrongPath />
        </Route>

      </Switch>
       {/* <PopupMenu isOpen={isMenuOpen} onClose={closeMenu} />  */}
       <InfoTooltip
        image={infoTooltipImage}
        message={message}
        isOpen={isInfoTooltipOpen}
        setIsOpen={setIsInfoTooltipOpen}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;