import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import Homepage from './components/Hompage/Homepage';
import CreateSpots from './components/CreateSpots/CreateSpots';
import SpotDetails from './components/SpotDetails/SpotDetails';
import Spots from './components/Spots/Spots';
import UpdateSpot from './components/UpdateSpot/UpdateSpot';
import ManageReviews from './components/ManageReviews/ManageReviews';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);
  

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Homepage/>
      },
      {
        path: '/spots',
        element: <Spots/>
      },
      {
        path: '/spots/new',
        element: <CreateSpots/>
      },
      {
        path: '/spots/:id',
        element: <SpotDetails/>
      },
      {
        path: '/spots/:id/edit',
        element: <UpdateSpot/>
      },
      {
        path: '/reviews/current',
        element: <ManageReviews/>
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

