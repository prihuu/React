import {useEffect, useState} from 'react';
import {useUserContext} from '../hooks/contextHooks';
import {useLike} from '../hooks/apiHooks';

const Likes = ({item}) => {
  const {user} = useUserContext();
  const {
    postLike,
    deleteLike,
    getLikeCountByMediaId,
    getLikeByUser,
  } = useLike();

  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(null);

  const getLikes = async () => {
    try {
      const countResult = await getLikeCountByMediaId(item.media_id);
      setLikeCount(countResult.count);

      if (user) {
        try {
          const likeResult = await getLikeByUser(
            item.media_id,
            localStorage.getItem('token')
          );
          setUserLike(likeResult);
        } catch (error) {
          // 404 means the user has not liked this media
          setUserLike(null);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLikes();
  }, [item.media_id, user]);

  const handleLike = async () => {
    const token = localStorage.getItem('token');

    try {
      if (userLike) {
        await deleteLike(userLike.like_id, token);
        setUserLike(null);
      } else {
        const result = await postLike(item.media_id, token);
        console.log(result);
      }

      await getLikes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleLike}
        disabled={!user}
        className={`rounded px-4 py-2 font-medium ${
          !user
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : userLike
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {userLike ? '♥ Unlike' : '♡ Like'} ({likeCount})
      </button>
    </div>
  );
};

export default Likes;
