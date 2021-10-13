
import { Global, css } from '@emotion/react';
import ErrorChart from './components/ErrorChart';
import GlobalInfo from "./components/GlobalInfo";
import MainChart from './components/MainChart';
import MaxErrorChart from './components/MaxErrorChart';

const App: React.FunctionComponent = () => {
  return (
    <div>
      <Global styles={css`
        body {
          background-color: #f2f2f2;
          color: #696969;
        }
      `} />

      <div className="App">
          <>
            <GlobalInfo />
            <MaxErrorChart />
          </>
      </div>
    </div>
  );
}

export default App;
