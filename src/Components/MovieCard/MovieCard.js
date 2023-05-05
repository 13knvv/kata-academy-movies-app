import { format } from 'date-fns';
import { Image, Space, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import './MovieCard.css';
import fallbackImg from './img/noimg.png';

function MovieCard({ movie }) {
  const {
    title,
    overview,
    release_date: releaseDate,
    genre_ids: genreIds = ['tag', 'tag'],
    poster_path: posterPath,
  } = movie;

  const genreTags = genreIds.map((genre) => <Tag key={Math.random()}>{genre}</Tag>);
  const posterUrl = posterPath ? `https://image.tmdb.org/t/p/original/${posterPath}` : '';
  const releaseDateFormated = format(new Date(...releaseDate.split('-').map((num) => +num)), "MMMM d',' yyyy");
  const overviewShorted = `${overview.split(' ').slice(0, 30).join(' ')} ...`;

  return (
    <div className="card">
      <Image alt={movie.title} src={posterUrl} width={183} height={281} fallback={fallbackImg} />
      <div className="card__about-movie">
        <Title level={3} className="card__title">
          {title}
        </Title>
        <span className="card__data">{releaseDateFormated}</span>
        <div className="card__genres">
          <Space size={[0, 8]} wrap>
            {genreTags}
          </Space>
        </div>
        <Paragraph>{overviewShorted}</Paragraph>
      </div>
    </div>
  );
}

export default MovieCard;
