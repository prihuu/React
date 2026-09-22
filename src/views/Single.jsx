import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

const Single = () => {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const result = await fetchData(
          import.meta.env.VITE_MEDIA_API + '/media/1'
        );

        const user = await fetchData(
          import.meta.env.VITE_AUTH_API + '/users/' + result.user_id
        );

        setMedia({
          ...result,
          username: user.username,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getMedia();
  }, []);

  if (!media) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{media.title}</h1>
      <p>Owner: {media.username}</p>
    </>
  );
};

export default Single;
