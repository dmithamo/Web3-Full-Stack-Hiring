import Web3 from 'web3';
import { useEffect, useState } from 'react';
import daiABI from '../reference/abi/dai';

// initialize a We3JS client
const daiContractAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const web3Client = new Web3(Web3.givenProvider || 'ws://localhost:8545');
const daiContract = new web3Client.eth.Contract(
  // @ts-ignore
  daiABI,
  daiContractAddress,
);

/**
 * @description abstract the logic for querying balance into a custom hook
 * @param {string} address of target account on the Ethereum blockchain
 * @returns { isFetching: boolean; error: string | false; balance: string }
 */
export const useGetBalance = (
  address: string,
): { isFetching: boolean; error: string | false; balance: string } => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<false | string>(false);
  const [balance, setBalance] = useState<string>('');

  useEffect(() => {
    setIsFetching(true);

    // prevent `invalid address` error before user types address
    if (!address) {
      setBalance('');
      setError(false);
      setIsFetching(false);
      return;
    }

    try {
      daiContract.methods
        .balanceOf(address)
        .call()
        .then((bal: any) => {
          setBalance(bal);
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

/**
 *@description Convert wei to ether
 * */
export const convertWeiToEther = (weiAmount: string): number =>
  Number(web3Client.utils.fromWei(weiAmount));

export default web3Client;
