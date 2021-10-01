import React, { useState } from 'react';
import { convertWeiToEther, useGetBalance } from '../utils/web3-client';
import Searchbar from '../components/Searchbar';
import { convertEtherToUSD } from '../utils/formatNumbers';

const Homepage: React.FC = () => {
  const [query, setQuery] = useState('');
  const { isFetching, error, balance } = useGetBalance(query);

  return (
    <>
      <p>Type a valid address and search to view the balance</p>
      <p>
        <>(Press&nbsp;</>
        <kbd>ESC</kbd>
        <>&nbsp;to clear)</>
      </p>

      <Searchbar query={query} onSearch={setQuery} />
      {error ? <p style={{ color: 'red' }}>{error}</p> : <></>}
      {isFetching ? <p style={{ color: 'grey' }}>Loading ...</p> : <></>}
      {query && !error ? (
        <p>{convertEtherToUSD(convertWeiToEther(balance))}</p>
      ) : (
        <></>
      )}
    </>
  );
};

export default Homepage;
