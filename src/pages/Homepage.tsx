import React, { useState } from 'react';
import Searchbar from '../components/Searchbar';
import SelectDropdown from '../components/SelectDropdown';
import { Currency } from '../utils/reusedTypes';
import WalletDisplay from '../components/WalletDisplay';

const Homepage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [currency, setCurrency] = useState<Currency>('USD');

  const currencyOptions: { label: string; value: Currency }[] = [
    { label: 'United States Dollars', value: 'USD' },
    { label: 'Pound Sterling', value: 'GBP' },
    { label: 'Euro', value: 'EUR' },
    { label: 'Kenya Shillings', value: 'KES' },
  ];

  return (
    <div className="transition-all">
      <Searchbar query={query} onSearch={setQuery} />

      <>
        {!query ? (
          <>
            <p className="text-sm pt-2 text-gray-500">
              Enter a valid address and search to view the balance. Press `ESC`
              to clear
            </p>
            <p className="text-sm pt-2 text-gray-500 opacity-75">
              e.g. 0x742d35cc6634c0532925a3b844bc454e4438f44e
            </p>
          </>
        ) : (
          <></>
        )}
      </>

      {query ? (
        <div className="mt-10">
          <div className="flex justify-between align-middle pb-10 pb-5 pt-5">
            <p className="uppercase font-bold text-gray-700 text-2xl">
              Wallets
            </p>
            <SelectDropdown
              options={currencyOptions}
              selected={currency}
              onChange={(value) => setCurrency(value as Currency)}
            />
          </div>

          <div className="mt-5">
            <WalletDisplay
              walletName="DAI"
              walletLabel="DAI Coin"
              address={query}
              displayCurrency={currency}
            />
          </div>

          <div className="mt-10">
            <WalletDisplay
              walletName="USDC"
              walletLabel="USD Coin"
              address={query}
              displayCurrency={currency}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Homepage;
