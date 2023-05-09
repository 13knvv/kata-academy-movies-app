import { Col, Row } from 'antd';
import MovieCard from '../MovieCard/MovieCard';
import './Movies.css';

function Movies({ movies }) {
  const movieCards = movies.map((movie) => (
    <Col xs={24} md={12} key={movie.id}>
      <MovieCard movie={movie} />
    </Col>
  ));

  return (
    <Row
      gutter={[
        { xs: 8, sm: 20, lg: 32 },
        { xs: 8, sm: 20, lg: 32 },
      ]}
      className="movies"
    >
      {movieCards}
    </Row>
  );
}

export default Movies;
