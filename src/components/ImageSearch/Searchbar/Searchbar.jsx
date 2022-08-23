import { Component } from 'react';
import PropTypes from 'prop-types';

import style from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.search === '') {
      return;
    }
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset() {
    this.setState({
      search: '',
    });
  }
  render() {
    const { search } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <>
        <header>
          <form onSubmit={handleSubmit} className={style.form}>
            <button type="submit" className={style.btn}>
              <span>Search</span>
            </button>

            <input
              onChange={handleChange}
              value={search}
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
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
