import { Input } from 'antd';
import debounce from 'lodash.debounce';
import React from 'react';
import './SearchInput.css';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.searchMoviesDebounced = debounce(props.searchMovies, 1000);
  }

  onChangeSearch = (e) => {
    const { changeSearchValue } = this.props;
    const { value } = e.target;

    changeSearchValue(value);
    if (value) {
      this.searchMoviesDebounced(value);
    } else this.searchMoviesDebounced();
  };

  render() {
    const { searchValue } = this.props;

    return (
      <Input
        placeholder="Type to search..."
        value={searchValue}
        onChange={this.onChangeSearch}
        className="searchInput"
      />
    );
  }
}

export default SearchInput;
