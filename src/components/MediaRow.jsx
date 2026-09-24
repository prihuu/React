import {useNavigate} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';
import {useMedia} from '../hooks/apiHooks';

const MediaRow = ({item, setSelectedItem}) => {
  const {user} = useUserContext();
  const {deleteMedia, modifyMedia} = useMedia();
  const navigate = useNavigate();

  const isOwner = user && user.user_id === item.user_id;
  const isAdmin = user && user.level_name?.toLowerCase() === 'admin';

  const showButtons = user && (isOwner || isAdmin);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');

      await deleteMedia(item.media_id, token);

      navigate(0);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleModify = async () => {
    try {
      const token = localStorage.getItem('token');

      const inputs = {
        title: item.title,
        description: item.description,
      };

      await modifyMedia(item.media_id, inputs, token);

      navigate(0);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <tr onClick={() => setSelectedItem(item)}>
      <td>{item.title}</td>
      <td>Owner: {item.username}</td>

      {showButtons && (
        <td className="flex gap-2">
          <button
            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            onClick={(event) => {
              event.stopPropagation();
              handleModify();
            }}
          >
            Modify
          </button>

          <button
            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
            onClick={(event) => {
              event.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};

export default MediaRow;
