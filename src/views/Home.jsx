import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';
import MediaRow from '../components/MediaRow';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const json = await fetchData(
          import.meta.env.VITE_MEDIA_API + '/media'
        );

        const newArray = await Promise.all(
          json.map(async (item) => {
            const result = await fetchData(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id
            );

            return {
              ...item,
              username: result.username,
            };
          })
        );

        setMediaArray(newArray);
      } catch (error) {
        console.error(error);
      }
    };

    getMedia();
  }, []);

  return (
    <>
      <h1>Home</h1>

      {mediaArray.map((media) => (
        <MediaRow key={media.media_id} media={media} />
      ))}
    </>
  );
};

export default Home;
