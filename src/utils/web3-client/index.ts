import Web3 from 'web3';
import { useEffect, useState } from 'react';
import daiABI from '../reference/abi/dai';
import er20ABI from '../reference/abi/erc20';
import { Wallet } from '../reusedTypes';

// initialize a We3JS client
const web3Client = new Web3(Web3.givenProvider || 'ws://localhost:8545');

// setup daicontract
const daiContractAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const daiContract = new web3Client.eth.Contract(
  // @ts-ignore
  daiABI,
  daiContractAddress,
);

// setup usdc contract
const usdcContractAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const usdcContract = new web3Client.eth.Contract(
  // @ts-ignore
  er20ABI,
  usdcContractAddress,
);

/**
 * @description abstract the logic for querying balance into a custom hook
 * @param {string} address of target account on the Ethereum blockchain
 * @param {Wallet} walletName target coin
 * @returns { isFetching: boolean; error: string | false; balance: string }
 */
export const useGetBalance = (
  address: string,
  walletName: Wallet,
): { isFetching: boolean; error: string | false; balance: string } => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<false | string>(false);
  const [balance, setBalance] = useState<string>('');

  const getContract = () => {
    switch (walletName) {
      case 'USDC':
        return usdcContract;

      default:
        return daiContract;
    }
  };

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
      getContract()
        .methods.balanceOf(address)
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
