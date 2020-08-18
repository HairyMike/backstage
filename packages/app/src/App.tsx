/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  createApp,
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage,
} from '@backstage/core';
import React, { FC } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Root from './components/Root';
import * as plugins from './plugins';
import { apis } from './apis';
import { hot } from 'react-hot-loader/root';
import { providers } from './identityProviders';
import { route as githubActionsRoute } from '@backstage/plugin-github-actions';

const app = createApp({
  apis,
  plugins: Object.values(plugins),
  components: {
    SignInPage: props => {
      return (
        <SignInPage
          {...props}
          providers={['guest', 'custom', ...providers]}
          title="Select a sign-in method"
          align="center"
        />
      );
    },
  },
});

const AppProvider = app.getProvider();
const AppRouter = app.getRouter();
const Router = ({ children }) => (
  <AppRouter>
    <Routes>{children}</Routes>
  </AppRouter>
);
// const AppRoutes = app.getRoutes();

const MainPage = () => <Route path="/" element={<div>dummy</div>} />;
const App: FC<{}> = () => (
  <AppProvider>
    <AlertDisplay />
    <OAuthRequestDialog />
    <Router>
      <Root>
        <Routes>
          <Route path="/" element={MainPage} />
          <Route path="/catalog" element={<CatalogPage>...</CatalogPage>} />

          <Route path="/github-actions" element={githubActionsRoute} />
        </Routes>
      </Root>
    </Router>
  </AppProvider>
);

export default hot(App);
