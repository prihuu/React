import {useEffect} from 'react';
import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="bg-gray-800 px-6 py-4 shadow-md">
        <ul className="flex gap-6 text-white *:rounded *:px-3 *:py-2 *:hover:bg-gray-700 *:hover:text-blue-300">
          <li>
            <Link to="/">Home</Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>

              <li>
                <Link to="/upload">Upload</Link>
              </li>

              <li>
                <Link to="/single">Single</Link>
              </li>

              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>

      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
