import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = await getUserByToken(token);
        console.log('USER DATA:', userData);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Profile</h1>

      <p>Username: {user.user.username}</p>
      <p>Email: {user.user.email}</p>
      <p>User ID: {user.user.user_id}</p>
    </>
  );
};

export default Profile;
