const MediaRow = ({media}) => {
  return (
    <div>
      <h2>{media.title}</h2>
      <p>Owner: {media.username}</p>
    </div>
  );
};

export default MediaRow;
