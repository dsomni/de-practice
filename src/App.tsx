
import { Global, css } from '@emotion/react';
import { useState, useEffect } from "react";
import GlobalInfo from "./components/GlobalInfo";
import CountryList from "./components/CountryList";
import { Country, ResponseData } from "./types";
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';

const App: React.FunctionComponent = () => {
  // const [data, setData] = useState<ResponseData | undefined>(undefined);
  // const [activeCountries, setActiveCountries] = useState<Country[]>([]);

  // const onCountryClick = (country: Country) => {
  //   const countryIndex = activeCountries.findIndex(activeCountry => activeCountry.ID === country.ID);

  //   if (countryIndex > -1) {
  //     const newActiveCountries = [...activeCountries];
  //     newActiveCountries.splice(countryIndex, 1);

  //     setActiveCountries(newActiveCountries);
  //   } else {
  //     setActiveCountries([...activeCountries, country]);
  //   }
  // };

  // const fetchData = async () => {
  //   const result = await fetch('https://api.covid19api.com/summary');
  //   const data: ResponseData = await result.json();

  //   setData(data);
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])

  return (
    <div>
      <Global styles={css`
        body {
          background-color: #f2f2f2;
          color: #696969;
        }
      `} />

      <div className="App">
        {/* {data ? ( */}
          <>
            <GlobalInfo />
            <LineChart />

            {/* {activeCountries.length ? <BarChart countries={activeCountries} /> : null} */}


            {/* <CountryList countries={data?.Countries} onItemClick={onCountryClick} /> */}
          </>
        {/* ) : "Loading.."} */}

      </div>
    </div>
  );
}

export default App;
