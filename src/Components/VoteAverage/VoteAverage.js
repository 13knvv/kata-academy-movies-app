import './VoteAverage.css';

function VoteAverage({ voteAverage }) {
  const voteAverageFormated = voteAverage !== 10 ? voteAverage.toFixed(1) : voteAverage;
  const colors = [
    '#E90000',
    '#E90000',
    '#E90000',
    '#E97E00',
    '#E97E00',
    '#E9D100',
    '#E9D100',
    '#66E900',
    '#66E900',
    '#66E900',
    '#66E900',
  ];
  const borderColor = {
    borderColor: colors[Math.floor(voteAverage)],
  };

  return (
    <div className="vote-average" style={borderColor}>
      {voteAverageFormated}
    </div>
  );
}

export default VoteAverage;
