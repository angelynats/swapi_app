import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../../utils/ProtectedRoute';
import AppBar from '../AppBar/AppBar';
import Loader from '../Loader/Loader';

const AsyncHome = lazy(() =>
  import('../../pages/HomePage/HomePage' /* webpackChunkName: 'home-page'*/),
);

const AsyncSimpleCharacter = lazy(() =>
  import(
    '../../pages/SimpleCharacterPage/SimpleCharacterPage' /* webpackChunkName: 'simple-character-page'*/
  ),
);

const AsyncCharacters = lazy(() =>
  import(
    '../../pages/CharactersPage/CharactersPage' /* webpackChunkName: 'characters-page'*/
  ),
);

const AsyncLikes = lazy(() =>
  import('../../pages/LikesPage/LikesPage' /* webpackChunkName: 'likes-page'*/),
);

const App = () => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <AsyncHome />
          </Route>
          <ProtectedRoute path="/characters/:characterId" redirectTo="/">
            <AsyncSimpleCharacter />
          </ProtectedRoute>
          <ProtectedRoute path="/characters" redirectTo="/">
            <AsyncCharacters />
          </ProtectedRoute>
          <ProtectedRoute path="/likes" redirectTo="/">
            <AsyncLikes />
          </ProtectedRoute>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
