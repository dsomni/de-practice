
import { Global, css } from '@emotion/react';
import GlobalInfo from "./components/GlobalInfo";
import MainChart from './components/MainChart';

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
            <MainChart />
          </>
      </div>
    </div>
  );
}

export default App;
