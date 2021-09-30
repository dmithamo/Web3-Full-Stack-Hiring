import Web3 from 'web3';
import { useEffect, useState } from 'react';

// initialize a We3JS client
const client = new Web3(Web3.givenProvider || 'ws://localhost:8545');
export default client;

/**
 * @description abstract the logic for querying balance into a custom hook
 * @param {string} address of target account on the Ethereum blockchain
 * @returns { isFetching: boolean; error: string | false; balance: number }
 */
export const useGetBalance = (
  address: string,
): { isFetching: boolean; error: string | false; balance: number } => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<false | string>(false);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    setIsFetching(true);

    // defaults to prevent `invalid address` error before user types address
    if (!address) {
      setBalance(0);
      setError(false);
      setIsFetching(false);
      return;
    }

    try {
      client.eth
        .getBalance(address)
        .then((bal) => {
          setBalance(Number(bal) || 0);
        })
        .finally(() => setIsFetching(false));
    } catch (err: any) {
      setError(
        (err.message as string) || 'Unable to fetch balance from this address',
      );
    } finally {
      setIsFetching(false);
    }
  }, [address]);

  return { isFetching, balance, error };
};
