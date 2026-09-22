import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const json = await fetchData('test.json');
        setMediaArray(json);
      } catch (error) {
        console.error(error);
      }
    };

    getMedia();
  }, []);

  console.log(mediaArray);

  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </>
  );
};

export default Home;
