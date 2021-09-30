import React from 'react';
import { useGetBalance } from './utils/web3-client';

const App: React.FC = () => {
  const { isFetching, error, balance } = useGetBalance(
    '0xc098b2a3aa256d2140208c3de6543aaef5cd3a94',
  );

  if (isFetching) {
    return <>Loading ...</>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <>
      <p>Hello there</p>
      <p>{balance}</p>
    </>
  );
};

export default App;
