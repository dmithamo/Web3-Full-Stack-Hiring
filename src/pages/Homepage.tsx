import React, { useState } from 'react';
import { useGetBalance } from '../utils/web3-client';
import Searchbar from '../components/Searchbar';
import BalanceDisplay from '../components/BalanceDisplay';
import SelectDropdown from '../components/SelectDropdown';
import { Currency } from '../utils/reusedTypes';

const Homepage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [currency, setCurrency] = useState<Currency>('USD');
  const currencyOptions: { label: string; value: Currency }[] = [
    { label: 'United States Dollars', value: 'USD' },
    { label: 'Pound Sterling', value: 'GBP' },
    { label: 'Euro', value: 'EUR' },
    { label: 'Kenya Shillings', value: 'KES' },
  ];
  const { isFetching, error, balance } = useGetBalance(query);

  return (
    <div className="transition-all">
      <Searchbar query={query} onSearch={setQuery} />
      <div className="mt-2">
        {isFetching ? <p className="text-gray-500">Loading ...</p> : <></>}

        {error ? (
          <p className="font-thin text-sm text-red-500">{error}</p>
        ) : (
          <>
            {!balance ? (
              <>
                <p className="text-sm pt-2 text-gray-500">
                  Enter a valid address and search to view the balance. Press
                  `ESC` to clear
                </p>
                <p className="text-sm pt-2 text-gray-500 opacity-75">
                  e.g. 0x742d35cc6634c0532925a3b844bc454e4438f44e
                </p>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>

      {query && !error && !isFetching ? (
        <div className="mt-10">
          <div className="flex justify-between align-middle pb-10 pt-10">
            <p className="uppercase font-bold text-gray-500 text-2xl">
              Wallets
            </p>
            <SelectDropdown
              options={currencyOptions}
              selected={currency}
              onChange={(value) => setCurrency(value as Currency)}
            />
          </div>
          <BalanceDisplay
            balance={balance}
            displayCurrency={currency}
            walletLabel="MakerDAO"
            walletName="DAI"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Homepage;
