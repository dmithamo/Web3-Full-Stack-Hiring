import React, { useState } from 'react';
import { convertWeiToEther, useGetBalance } from '../utils/web3-client';
import Searchbar from '../components/Searchbar';
import { convertEtherToUSD } from '../utils/formatNumbers';

const Homepage: React.FC = () => {
  const [query, setQuery] = useState('');
  const { isFetching, error, balance } = useGetBalance(query);

  return (
    <>
      <Searchbar query={query} onSearch={setQuery} />

      <div className="pt-2 pb-2">
        {isFetching ? <p className="text-gray-500">Loading ...</p> : <></>}

        {error ? (
          <p className="font-thin text-sm text-red-500">{error}</p>
        ) : (
          <>
            {!balance ? (
              <p className="text-sm pt-2 text-gray-500">
                Type a valid address and search to view the balance. Press `ESC`
                to clear
              </p>
            ) : (
              <></>
            )}
          </>
        )}

        {query && !error ? (
          <p>{convertEtherToUSD(convertWeiToEther(balance))}</p>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Homepage;
