import Likes from '../components/Likes';

const SingleView = ({item, setSelectedItem}) => {
  if (!item) {
    return null;
  }

  return (
    <div>
      <h2>{item.title}</h2>
      <p>Owner: {item.username}</p>

      <Likes item={item} />

      <button
        className="mt-4 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        onClick={() => setSelectedItem(null)}
      >
        Close
      </button>
    </div>
  );
};

export default SingleView;
