import daiIcon from '../assets/multi-collateral-dai-dai-logo.svg';
import usdIcon from '../assets/united-states.svg';
import usdcIcon from '../assets/usd-coin-usdc-logo.svg';
import euroIcon from '../assets/euro-coin.png';
import kesIcon from '../assets/kenya.png';
import gbpIcon from '../assets/united-kingdom.png';
import { Currency, Wallet } from './reusedTypes';

/**
 * @description get an icon for a wallet given the wallet's name
 * @param walletName
 * @return {string} path to icon
 */
export const getWalletIcon = (walletName: Wallet): string => {
  switch (walletName) {
    case 'DAI':
      return daiIcon;

    case 'USDC':
      return usdcIcon;

    default:
      return '';
  }
};

/**
 * @description get an icon for a given currency
 * @param currency
 * @return {string} path to icon
 */
export const getCurrencyIcon = (currency: Currency): string => {
  switch (currency) {
    case 'USD':
      return usdIcon;
    case 'EUR':
      return euroIcon;

    case 'KES':
      return kesIcon;

    case 'GBP':
      return gbpIcon;

    default:
      return '';
  }
};
