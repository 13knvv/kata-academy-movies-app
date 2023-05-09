import { Offline } from 'react-detect-offline';
import { Alert, Pagination, Result, Spin } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import './App.css';
import React from 'react';
import api from '../../api/api';
import Movies from '../Movies/Movies';
import SearchInput from '../ SearchInput/ SearchInput';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: 'return',
      movies: [],
      totalItems: 0,
      currentPage: 1,
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.searchMovies();
  }

  searchMovies = async (keyWord, page = 1) => {
    try {
      this.setState({
        loading: true,
      });
      const data = await api.getMovies(keyWord, page);
      this.setState({
        movies: data.results,
        totalItems: data.total_results,
        currentPage: data.page,
        error: null,
      });
    } catch (err) {
      this.setState({
        error: err,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  changeSearchValue = (value) => {
    this.setState({
      searchValue: value,
    });
  };

  changePage = (page) => {
    const { searchValue } = this.state;

    this.searchMovies(searchValue, page);
  };

  render() {
    const { movies, error, loading, totalItems, currentPage } = this.state;

    return (
      <div className="app">
        <Offline>
          <Alert
            message="Offline"
            description="Сheck your internet connection"
            type="info"
            showIcon
            icon={<WifiOutlined />}
          />
        </Offline>
        <div className="app__search-movies">
          <SearchInput
            searchMovies={this.searchMovies}
            changeSearchValue={this.changeSearchValue}
            searchValue={this.searchValue}
          />
        </div>
        {error && <Alert message="Error" description={error.message} type="error" showIcon />}
        <Spin spinning={loading} tip="Loading" size="large" className="app__spiner">
          {movies.length || loading || error ? (
            <Movies movies={movies} />
          ) : (
            <Result status="warning" title="Not found! Try another search text." />
          )}
        </Spin>
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={20}
          onChange={this.changePage}
          hideOnSinglePage
          showSizeChanger={false}
          responsive
          className="app__pagination"
        />
      </div>
    );
  }
}

export default App;
