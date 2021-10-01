/**
 * @description convert ether to USD
 * Assumes 1USD === 1Ether
 * @param etherAmount
 * @return {string} amount in USD
 */
export const convertEtherToUSD = (etherAmount: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    etherAmount,
  );
