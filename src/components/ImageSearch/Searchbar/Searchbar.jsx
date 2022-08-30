import { useState } from 'react';
import PropTypes from 'prop-types';

import style from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setState(value);
  };

  const reset = () => {
    setState('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(state);
    reset();
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit} className={style.form}>
          <button type="submit" className={style.btn}>
            <span>Search</span>
          </button>

          <input
            onChange={handleChange}
            value={state}
            name="search"
            className={style.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
