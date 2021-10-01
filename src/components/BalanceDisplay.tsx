import React, { FC } from 'react';
import { Currency } from '../utils/reusedTypes';
import {
  convertWeiToEuro,
  convertWeiToGBP,
  convertWeiToKES,
  convertWeiToUSD,
} from '../utils/formatNumbers';
import daiIcon from '../assets/Badge_Dai.svg';
import {
  USD_TO_EURO_RATE,
  USD_TO_GBP_RATE,
  USD_TO_KES_RATE,
} from '../utils/constants';

type Props = {
  balance: string; // in wei
  displayCurrency: Currency;
  walletLabel: string;
  walletName: 'DAI' | 'USDC';
};

const BalanceDisplay: FC<Props> = ({
  balance,
  displayCurrency,
  walletLabel,
  walletName,
}: Props) => {
  const convertToTargetCurrency = (): string => {
    switch (displayCurrency) {
      case 'USD':
        return convertWeiToUSD(balance);

      case 'GBP':
        return convertWeiToGBP(balance);

      case 'EUR':
        return convertWeiToEuro(balance);

      case 'KES':
        return convertWeiToKES(balance);

      default:
        return convertWeiToUSD(balance);
    }
  };

  const getWalletIcon = (): string => {
    switch (walletName) {
      case 'DAI':
        return daiIcon;

      default:
        return '';
    }
  };

  const getConversionRate = (): number => {
    switch (displayCurrency) {
      case 'USD':
        return 1;

      case 'EUR':
        return USD_TO_EURO_RATE;

      case 'GBP':
        return USD_TO_GBP_RATE;

      case 'KES':
        return USD_TO_KES_RATE;

      default:
        return 1;
    }
  };

  return (
    <div className="relative border border-10 border-gray-300 p-5 flex flex-col justify-around align-baseline rounded-lg bg-white">
      <img
        className="h-10 absolute -top-5 left-5 rounded-lg mx-auto"
        src={getWalletIcon()}
        alt={walletName}
      />
      <div className="flex justify-between align-middle">
        <div className="flex flex-col">
          <span className="capitalize font-bold text-2xl pt-4">
            {walletLabel}
          </span>
          <span className="capitalize text-sm text-gray-500 opacity-75 pt-1 pb-4">
            {walletName}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="capitalize font-bold text-2xl pt-4">
            {convertToTargetCurrency()}
          </span>
          <span className="uppercase text-sm text-gray-500 opacity-75 pt-1 pb-4">
            {`balance (${getConversionRate()} ${displayCurrency} = 1 Ether)`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BalanceDisplay;
