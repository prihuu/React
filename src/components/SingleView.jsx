const SingleView = ({item, setSelectedItem}) => {
  if (!item) {
    return null;
  }

  return (
    <div>
      <h2>{item.title}</h2>
      <p>Owner: {item.username}</p>

      <button onClick={() => setSelectedItem(null)}>
        Close
      </button>
    </div>
  );
};

export default SingleView;
