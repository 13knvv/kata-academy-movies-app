import { Offline } from 'react-detect-offline';
import { Alert, Pagination, Result, Spin } from 'antd';
import { WifiOutlined } from '@ant-design/icons';
import './App.css';
import React from 'react';
import Movies from '../Movies/Movies';
import SearchInput from '../ SearchInput/ SearchInput';
import TopBar from '../TopBar/TopBar';
import api from '../../services/api';
import ContextGenres from '../../services/contextGenres';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageApp: 'Search',
      searchValue: 'Return',
      movies: [],
      genres: [],
      totalItems: 0,
      currentPage: 1,
      error: null,
      loading: false,
      isOpenSession: false,
    };
  }

  componentDidMount() {
    this.openGuestSession();
    this.getGenres();
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpenSession, pageApp } = this.state;
    const { isOpenSession: prevIsOpenSession, pageApp: prevPageApp } = prevState;

    if (isOpenSession !== prevIsOpenSession && isOpenSession) {
      this.getMovies();
    }
    if (pageApp !== prevPageApp && isOpenSession) {
      this.getMovies();
    }
  }

  getGenres = async () => {
    try {
      const data = await api.getGenres();
      this.setState({
        genres: data.genres,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  openGuestSession = async () => {
    try {
      this.setState({
        loading: true,
      });
      await api.openGuestSession();
      this.setState({
        error: null,
        isOpenSession: true,
      });
    } catch (err) {
      this.setState({
        error: err,
        isOpenSession: false,
        loading: false,
      });
    }
  };

  searchMovies = async (keyWord, page = 1) => {
    this.getMovies(keyWord, page);
  };

  getMovies = async (keyWord, page = 1) => {
    const { pageApp } = this.state;

    try {
      this.setState({
        loading: true,
        movies: [],
        totalItems: 0,
        currentPage: 1,
      });
      const data = pageApp === 'Search' ? await api.getMovies(keyWord, page) : await api.getRatedMovies(page);
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

    this.getMovies(searchValue, page);
  };

  changePageApp = (pageApp) => {
    this.setState({
      pageApp,
    });
  };

  render() {
    const { movies, error, loading, totalItems, currentPage, pageApp, genres } = this.state;

    return (
      <ContextGenres.Provider value={genres}>
        <div className="app">
          <TopBar pageApp={pageApp} changePageApp={this.changePageApp} />
          <Offline>
            <Alert
              message="Offline"
              description="Сheck your internet connection"
              type="info"
              showIcon
              icon={<WifiOutlined />}
              className="app__alert-error"
            />
          </Offline>
          {pageApp === 'Search' && (
            <div className="app__search-movies">
              <SearchInput
                searchMovies={this.searchMovies}
                changeSearchValue={this.changeSearchValue}
                searchValue={this.searchValue}
              />
            </div>
          )}
          {error && (
            <Alert message="Error" description={error.message} type="error" showIcon className="app__alert-error" />
          )}
          <Spin spinning={loading} tip="Loading" size="large" className="app__spiner">
            {movies.length || loading || error ? (
              <Movies movies={movies} />
            ) : (
              <Result status="warning" title="Not found! Try again." />
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
            className="pagination"
          />
        </div>
      </ContextGenres.Provider>
    );
  }
}

export default App;
