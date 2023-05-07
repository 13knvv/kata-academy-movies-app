import { Offline, Online } from 'react-detect-offline';
import { Alert, Col, Row, Spin } from 'antd';
import './App.css';
import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import api from '../../api/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.searchMovies();
  }

  searchMovies = async () => {
    try {
      const data = await api.getMovies();
      this.setState({
        movies: data.results,
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

  render() {
    const { movies, error, loading } = this.state;

    const movieCards = movies.map((movie) => (
      <Col xs={24} md={12} key={movie.id}>
        <MovieCard movie={movie} />
      </Col>
    ));

    return (
      <div className="app">
        <Online>
          {error && <Alert message="Error" description={error.message} type="error" showIcon />}
          <Spin spinning={loading} tip="Loading" size="large" className="app__spiner" />
          <Row
            justify="center"
            gutter={[
              { xs: 8, sm: 20, lg: 32 },
              { xs: 8, sm: 20, lg: 32 },
            ]}
          >
            {movieCards}
          </Row>
        </Online>
        <Offline>
          <Alert message="Offline" description="Сheck your internet connection" type="warning" showIcon />
        </Offline>
      </div>
    );
  }
}

export default App;
