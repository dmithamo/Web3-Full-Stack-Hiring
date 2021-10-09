import React from 'react';
import {
  USD_TO_ETHER_RATE,
  USD_TO_EURO_RATE,
  USD_TO_GBP_RATE,
  USD_TO_KES_RATE,
} from '../utils/constants';
import {
  convertEtherToEuro,
  convertEtherToGBP,
  convertEtherToKES,
  convertEtherToUSD,
} from '../utils/formatNumbers';
import { getWalletIcon } from '../utils/helpers';
import { Currency, Wallet } from '../utils/reusedTypes';
import { useGetBalance } from '../utils/web3-client';

type Props = {
  walletName: Wallet;
  walletLabel: string;
  address: string; // I am sure web3 has a type for this ...
  displayCurrency: Currency;
};

const WalletDisplay: React.FC<Props> = ({
  address,
  walletName,
  walletLabel,
  displayCurrency,
}: Props) => {
  const { isFetching, error, balance } = useGetBalance(address, walletName);
  const convertToTargetCurrency = (): string => {
    switch (displayCurrency) {
      case 'USD':
        return convertEtherToUSD(balance);

      case 'GBP':
        return convertEtherToGBP(balance);

      case 'EUR':
        return convertEtherToEuro(balance);

      case 'KES':
        return convertEtherToKES(balance);

      default:
        return convertEtherToUSD(balance);
    }
  };

  const getConversionRate = (): number => {
    switch (displayCurrency) {
      case 'USD':
        return USD_TO_ETHER_RATE;

      case 'EUR':
        return USD_TO_ETHER_RATE * USD_TO_EURO_RATE;

      case 'GBP':
        return USD_TO_ETHER_RATE * USD_TO_GBP_RATE;

      case 'KES':
        return USD_TO_ETHER_RATE * USD_TO_KES_RATE;

      default:
        return USD_TO_ETHER_RATE;
    }
  };

  return (
    <div className="relative border border-10 border-gray-300 p-5 flex flex-col justify-around align-baseline rounded-lg bg-white">
      <img
        className="h-10 absolute -top-5 left-5 rounded-lg mx-auto"
        src={getWalletIcon(walletName)}
        alt={walletName}
      />

      {isFetching ? <p className="text-gray-500">Loading ...</p> : <></>}

      {error ? (
        <p className="font-thin text-sm text-red-500">{error}</p>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="capitalize font-bold text-2xl pt-4">
                {walletLabel}
              </span>
              <span className="capitalize text-sm text-gray-500 opacity-75 pt-1 pb-4">
                {walletName}
              </span>
            </div>

            {balance ? (
              <div className="flex flex-col">
                <span className="capitalize font-bold text-2xl pt-4">
                  {convertToTargetCurrency()}
                </span>

                <span className="uppercase text-sm text-gray-500 opacity-75 pt-1 pb-4">
                  {`balance (${getConversionRate()} ${displayCurrency} = 1 DAI)`}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-gray-400 font-bold">Loading ...</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WalletDisplay;
