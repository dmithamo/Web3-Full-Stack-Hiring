import { convertWeiToEther } from './web3-client';
import {
  USD_TO_EURO_RATE,
  USD_TO_GBP_RATE,
  USD_TO_KES_RATE,
} from './constants';

// NOTE: ALL THESE CONVERSIONS ASSUME 1 USD === 1 ETHER

/**
 * @description convert wei to USD
 * @param weiAmount
 * @return {string} amount in USD
 */
export const convertWeiToUSD = (weiAmount: string): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    convertWeiToEther(weiAmount),
  );

/**
 * @description convert wei to Pound Sterling
 * @param weiAmount
 * @return {string} amount in GBP
 */
export const convertWeiToGBP = (weiAmount: string): string =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
    convertWeiToEther(weiAmount) * USD_TO_GBP_RATE,
  );

/**
 * @description convert wei to Euro
 * @param weiAmount
 * @return {string} amount in Euro
 */
export const convertWeiToEuro = (weiAmount: string): string =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(convertWeiToEther(weiAmount) * USD_TO_EURO_RATE);

/**
 * @description convert wei to Kenya shillings
 * @param weiAmount
 * @return {string} amount in KES
 */
export const convertWeiToKES = (weiAmount: string): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KES',
  }).format(convertWeiToEther(weiAmount) * USD_TO_KES_RATE);
