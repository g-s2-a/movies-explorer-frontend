import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  const [findedMovie, setFindedMovie] = React.useState("");
  const [error, setError] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);

  function handleSearchMovie(e) {
    setFindedMovie(e.target.value);
    if (e.target.value.length === 0) {
      setError("Нужно ввести ключевое слово");
    } else {
      setError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    props.onGetMovies(findedMovie);
    setFindedMovie("");
  }

  React.useEffect(() => {
    if (findedMovie && !error) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [findedMovie, error]);

  return (
    <form className="search-form">
      <div className="search-form__block">
        <div className="search-form__search-container">
          <div className="search-form__input-container">
            <input className="search-form__input" placeholder="Фильм" required 
             type="text"
             name="search"
             minLength="2"
             maxLength="40"
             value={findedMovie}
             onChange={handleSearchMovie}
            />
            <button           
              type="submit"
              className="search-form__button"
              onClick={handleSubmit}
              disabled={!formValid}
            >
              Найти
            </button>
          </div>
          <div className="search-form__checkbox-container">
            <input className="search-form__checkbox" id="switch" type="checkbox" required
              onChange={props.onFilter}
              checked={!props.isShortMovie}
            />
            <label 
              className="search-form__checkbox-label" 
              htmlFor="switch"
            >
              <span className="search-form__checkbox-switch" />
            </label>
            <p className="search-form__checkbox-text">Короткометражки</p>
          </div>
        </div>
      </div>
      <div className="form__item-error">{error}</div>
    </form>
  );
}

export default SearchForm;
