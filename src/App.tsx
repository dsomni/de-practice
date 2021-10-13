
import { Global, css } from '@emotion/react';
import GlobalInfo from "./components/GlobalInfo";

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const MainChart = lazy(() => import('./components/MainChart'));
const MaxErrorChart = lazy(() => import('./components/MaxErrorChart'));
const ErrorChart = lazy(() => import('./components/ErrorChart'));

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Global styles={css`
        body {
          background-color: #f2f2f2;
          color: #696969;
        }
      `} />
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalInfo />
      <Switch>
        <Route exact path="/" component={MainChart}/>
        <Route path="/err" component={ErrorChart}/>
        <Route path="/maxerr" component={MaxErrorChart}/>
      </Switch>
    </Suspense>
  </Router>
  );
}

export default App;
