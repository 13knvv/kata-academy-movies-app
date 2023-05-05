import { Col, Row } from 'antd';
import './App.css';
import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import api from '../../api/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    this.searchMovies();
  }

  searchMovies = async () => {
    const data = await api.getMovies();
    this.setState({
      movies: data.results,
    });
  };

  render() {
    const { movies } = this.state;

    const movieCards = movies.map((movie) => (
      <Col span={12} key={movie.id}>
        <MovieCard movie={movie} />
      </Col>
    ));
    return (
      <div className="app">
        <Row gutter={[36, 36]}>{movieCards}</Row>
      </div>
    );
  }
}

export default App;
