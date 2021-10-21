import { useEffect, useState } from 'react';
import Web3 from 'web3';
import daiABI from '../reference/abi/dai';
import er20ABI from '../reference/abi/erc20';
import { Wallet } from '../reusedTypes';

// initialize a We3JS client
export const initializeClient = (): Web3 | null => {
  const PROVIDER_API_URL = process.env.REACT_APP_PROVIDER_URL_WSS;
  const web3Client = new Web3(PROVIDER_API_URL || '');

  return web3Client;
};

const setupDAIContract = (client: Web3): any =>
  new client.eth.Contract(
    // @ts-ignore
    daiABI,
    '0x6b175474e89094c44da98b954eedeac495271d0f', // dai contract address
  );

const setupUSDCContract = (client: Web3): any =>
  new client.eth.Contract(
    // @ts-ignore
    er20ABI,
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // usdc contract address
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

  const web3Client = initializeClient();

  if (!web3Client?.currentProvider) {
    return {
      error: 'Unable to connect to provider',
      isFetching: false,
      balance: '0',
    };
  }

  const getContract = () => {
    switch (walletName) {
      case 'USDC':
        return setupUSDCContract(web3Client);

      default:
        return setupDAIContract(web3Client);
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
      setBalance('0');
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
          setBalance(
            convertWeiToEther(bal, getDecimalsInContract(), web3Client),
          );
        });
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
  web3Client: Web3,
): string => {
  switch (decimals) {
    case '6':
      return web3Client.utils.fromWei(weiAmount, 'mwei');

    default:
      return web3Client.utils.fromWei(weiAmount); // assume decimals is default === '18'
  }
};

/**
 * @description Catch invalid address errors early
 * @param {string} address
 */
const web3Client = initializeClient();
export const isValidAddress = (address: string) =>
  (web3Client as Web3).utils.isAddress(address);
