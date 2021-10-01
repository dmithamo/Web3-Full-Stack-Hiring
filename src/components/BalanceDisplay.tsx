import React, { FC } from 'react';
import { Currency } from '../utils/reusedTypes';

type Props = {
  balance: {
    amount: string;
    currency: Currency;
  };
  displayCurrency: Currency;
  label: string;
  isPrimary?: boolean;
};

const BalanceDisplay: FC<Props> = ({
  balance,
  displayCurrency,
  label,
  isPrimary,
}: Props) => {
  const convertToTargetCurrency = (): string => {
    if (balance.currency === displayCurrency) {
      return '';
    }

    return '';
  };

  return (
    <div className="p-5 shadow-md">
      <span className={`${isPrimary ? 'font-bold' : ''} capitalize`}>
        {label}
      </span>
    </div>
  );
};

export default BalanceDisplay;
