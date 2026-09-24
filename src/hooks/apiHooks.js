import {useState, useEffect} from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
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

  const postMedia = async (file, inputs, token) => {
    const media = {
      filename: file.data.filename,
      title: inputs.title,
      description: inputs.description,
      filesize: file.data.filesize,
      media_type: file.data.media_type,
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(media),
    };

    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
      fetchOptions
    );

    return result;
  };

  const deleteMedia = async (mediaId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media/' + mediaId,
      fetchOptions
    );

    return result;
  };

  const modifyMedia = async (mediaId, inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputs),
    };

    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media/' + mediaId,
      fetchOptions
    );

    return result;
  };

  return {
    mediaArray,
    postMedia,
    deleteMedia,
    modifyMedia,
  };
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions
    );

    return loginResult;
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const user = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions
    );

    return user;
  };

  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const user = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions
    );

    return user;
  };

  return {getUserByToken, postUser};
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();

    formData.append('file', file);

    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const fileData = await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions
    );

    return fileData;
  };

  return {postFile};
};

const useLike = () => {
  const postLike = async (mediaId, token) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        media_id: mediaId,
      }),
    };

    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes',
      fetchOptions
    );

    return result;
  };

  const deleteLike = async (likeId, token) => {
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes/' + likeId,
      fetchOptions
    );

    return result;
  };

  const getLikeCountByMediaId = async (mediaId) => {
    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes/count/' + mediaId
    );

    return result;
  };

  const getLikeByUser = async (mediaId, token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const result = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/likes/bymedia/user/' + mediaId,
      fetchOptions
    );

    return result;
  };

  return {
    postLike,
    deleteLike,
    getLikeCountByMediaId,
    getLikeByUser,
  };
};

export {
  useMedia,
  useAuthentication,
  useUser,
  useFile,
  useLike,
};
