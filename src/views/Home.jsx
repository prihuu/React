import {useState} from 'react';
import {useMedia} from '../hooks/apiHooks';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const {mediaArray} = useMedia();

  return (
    <>
      <h1>Home</h1>

      <SingleView
        item={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <table>
        <tbody>
          {mediaArray.map((mediaItem) => (
            <MediaRow
              key={mediaItem.media_id}
              item={mediaItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
