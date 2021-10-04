import {
  USD_TO_ETHER_RATE,
  USD_TO_EURO_RATE,
  USD_TO_GBP_RATE,
  USD_TO_KES_RATE,
} from './constants';

// NOTE: ALL THESE CONVERSIONS ASSUME 1 USD === 1 ETHER

/**
 * @description convert ether to USD
 * @param etherAmount
 * @return {string} amount in USD
 */
export const convertEtherToUSD = (etherAmount: string): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    Number(etherAmount) / USD_TO_ETHER_RATE,
  );

/**
 * @description convert ether to Pound Sterling
 * @param etherAmount
 * @return {string} amount in GBP
 */
export const convertEtherToGBP = (etherAmount: string): string =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
    (Number(etherAmount) / USD_TO_ETHER_RATE) * USD_TO_GBP_RATE,
  );

/**
 * @description convert ether to Euro
 * @param etherAmount
 * @return {string} amount in Euro
 */
export const convertEtherToEuro = (etherAmount: string): string =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format((Number(etherAmount) / USD_TO_ETHER_RATE) * USD_TO_EURO_RATE);

/**
 * @description convert ether to Kenya shillings
 * @param etherAmount
 * @return {string} amount in KES
 */
export const convertEtherToKES = (etherAmount: string): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KES',
  }).format((Number(etherAmount) / USD_TO_ETHER_RATE) * USD_TO_KES_RATE);
