const MediaRow = ({item, setSelectedItem}) => {
  return (
    <tr onClick={() => setSelectedItem(item)}>
      <td>{item.title}</td>
      <td>Owner: {item.username}</td>
    </tr>
  );
};

export default MediaRow;
