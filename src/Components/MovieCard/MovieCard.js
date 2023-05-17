import { format } from 'date-fns';
import { Image, Rate, Space, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import { useContext, useEffect, useState } from 'react';
import './MovieCard.css';
import fallbackImg from './img/noimg.png';
import VoteAverage from '../VoteAverage/VoteAverage';
import api from '../../services/api';
import ContextGenres from '../../services/contextGenres';

function MovieCard({ movie }) {
  const {
    title,
    overview,
    release_date: releaseDate,
    genre_ids: genreIds = ['tag', 'tag'],
    poster_path: posterPath,
    vote_average: voteAverage,
    id,
  } = movie;

  const [rate, setRate] = useState(0);
  const genres = useContext(ContextGenres);

  useEffect(() => {
    if (localStorage.getItem('rates')) {
      const rates = JSON.parse(localStorage.getItem('rates'));
      setRate(rates[id] || 0);
    }
  }, []);

  const changeRate = async (value) => {
    const rates = JSON.parse(localStorage.getItem('rates'));

    try {
      setRate(value);
      const data = await api.putRateMovie(id, value);

      if (data.success) {
        const newRates = JSON.stringify({ ...rates, [id]: value });

        localStorage.setItem('rates', newRates);
      } else {
        setRate(rates[id] || 0);
      }
    } catch (err) {
      setRate(rates[id] || 0);
    }
  };

  const deleteRate = async () => {
    const rates = JSON.parse(localStorage.getItem('rates'));

    try {
      setRate(0);
      const data = await api.deleteRateMovie(id);

      if (data.success) {
        delete rates[id];
        const newRates = JSON.stringify(rates);

        localStorage.setItem('rates', newRates);
      } else {
        setRate(rates[id] || 0);
      }
    } catch (err) {
      setRate(rates[id] || 0);
    }
  };

  const onChangeRate = (value) => {
    value ? changeRate(value) : deleteRate();
  };

  const posterUrl = posterPath ? `https://image.tmdb.org/t/p/original/${posterPath}` : '';
  const releaseDateFormated = format(new Date(...releaseDate.split('-').map((num) => +num)), "MMMM d',' yyyy");
  const overviewShorted = `${overview.split(' ').slice(0, 20).join(' ')} ...`;
  const genreTags = genreIds.map((genreId) => {
    const genre = [...genres].find((item) => item.id === genreId);
    let name;
    if (genre) name = genre.name;
    return <Tag key={genreId}>{name || 'Not found'}</Tag>;
  });

  return (
    <div className="card">
      <Image alt={movie.title} src={posterUrl} fallback={fallbackImg} className="card__poster" />
      <div className="card__info">
        <header className="card__header">
          <Title level={3} className="card__title">
            {title}
          </Title>
          <VoteAverage voteAverage={voteAverage} />
        </header>
        <span className="card__data">{releaseDateFormated}</span>
        <div className="card__genres">
          <Space size={[0, 8]} wrap>
            {genreTags}
          </Space>
        </div>
      </div>
      <div className="card__about-movie">
        <Paragraph>{overviewShorted}</Paragraph>
        <Rate count={10} onChange={onChangeRate} value={rate} className="card__rate" />
      </div>
    </div>
  );
}

export default MovieCard;
