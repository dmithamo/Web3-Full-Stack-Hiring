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

  const getDecimalsInContract = (): '18' | '6' => {
    switch (walletName) {
      case 'USDC':
        return '6';

      default:
        return '18';
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
          // save the balance as Ether
          setBalance(convertWeiToEther(bal, getDecimalsInContract()));
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
export const convertWeiToEther = (
  weiAmount: string,
  decimals: '18' | '6',
): string => {
  switch (decimals) {
    case '6':
      return web3Client.utils.fromWei(weiAmount, 'mwei'); // rebase as 18 decimals

    default:
      return web3Client.utils.fromWei(weiAmount); // assume decimals is default === '18'
  }
};

/**
 * @description Catch invalid address errors early
 * @param {string} address
 */
export const isValidAddress = (address: string) =>
  web3Client.utils.isAddress(address);

export default web3Client;
