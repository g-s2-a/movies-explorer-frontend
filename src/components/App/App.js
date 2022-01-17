import React  from 'react';

import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';

import mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";

import Main from '../Main/Main';
import PopupMenu from "../Menu/Menu";
import Movies from '../Movies/Movies';

import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import WrongPath from '../WrongPath/WrongPath';

import CurrentUserContext from '../../contexts/CurrentUserContext';
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { MAX_SHORT_MOVIE_DORATION } from "../../utils/config";


function App() {

  const history = useHistory();


  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser]   = React.useState({ name: '', email: ''});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [sortedMovies, setSortedMovies] = React.useState([]);

  const [movies, setMovies] = React.useState([]);
  const [userMovies, setUserMovies] = React.useState([]);
  const [shortMovies, setShortMovies] = React.useState(false);
  const [moviesMessage, setMoviesMessage] = React.useState("");
  
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
          setMessage("Пользователь с таким email уже существует");
        } else {
          setMessage("При регистрации пользователя произошла ошибка");
        }
      });
  }

  // авторизация
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          setMessage("Что-то пошло не так");
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
        setMessage("При авторизации произошла ошибка");
        if (err === 401) {
          setMessage("Пользователь с таким email не найден");
        }
        if (err === 400) {
          setMessage("Неверный email или пароль");
        }
        localStorage.removeItem("jwt");
      });
  }

  function handleUpdateUser(data) {
    mainApi
      .editUserInfo(data)
      .then((editedData) => {
        setCurrentUser(editedData);
        setMessage("Данные профиля успешно обновлены");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        if (err.status === 409) {
          setMessage("Пользователь с таким email уже существует");
        } else {
          setMessage("При изменении данных профиля произошла ошибка");
        }
      });
  }

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userMovies");
    localStorage.removeItem("movies");
    localStorage.removeItem("sortedMovies");
    localStorage.removeItem("currentUser");
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
  function handleGetMovies(keyword) {
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
    }
	}

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
  }, [currentUser]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>

        <Route exact path="/">
          <Main />
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
          onGetMovies={handleGetMovies}
          onAddMovie={handleLikeChange}
        />

        <Route path="/signin">
          <Login onLogin={handleLogin} loggedIn={loggedIn} message={message} />
        </Route>

        <Route path="/signup">
          <Register onRegister={handleRegister} message={message} />
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
        />

        <Route path='*'>
          <WrongPath />
        </Route>

      </Switch>
       {/* <PopupMenu isOpen={isMenuOpen} onClose={closeMenu} />  */}
      <InfoTooltip />
    </CurrentUserContext.Provider>
  );
}

export default App;