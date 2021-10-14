
import { Global, css } from '@emotion/react';
import GlobalInfo from "./components/GlobalInfo";

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';

const MainChart = lazy(() => import('./charts/MainChart'));
const MaxErrorChart = lazy(() => import('./charts/MaxErrorChart'));
const ErrorChart = lazy(() => import('./charts/ErrorChart'));

const Nav = styled.div`
  display: flex;
  justify-content: start;
  gap: 15px;
  margin: 5px;
  font-size: 15pt;
  flex-wrap: wrap;
`;

const LinkWrapper = styled.span`
  border: #696969 2px solid;
  padding: 8px 10px 8px 10px;
  a{
    text-decoration: none;
    color: #696969;
    display: inline-block;
  }
  a:hover{
    color: #0d0d0d;
    transform: scale(1.1);
  }
`;

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
        <Nav>
          <LinkWrapper><Link to="/">Main</Link></LinkWrapper>
          <LinkWrapper><Link to="/err">Errors</Link></LinkWrapper>
          <LinkWrapper><Link to="/maxerr">Max errors</Link></LinkWrapper>
        </Nav>
        <Switch>
          <Route exact path="/" component={MainChart} />
          <Route path="/err" component={ErrorChart} />
          <Route path="/maxerr" component={MaxErrorChart} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
