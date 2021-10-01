import React from 'react';
import { Currency } from '../utils/reusedTypes';

type Props = {
  options: { label: string; value: string }[];
  selected: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (selected: string) => void;
  selectLabel?: string;
};

const SelectDropdown: React.FC<Props> = ({
  onChange,
  options,
  selected,
  selectLabel,
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Currency);
  };

  return (
    <div className="flex justify">
      {selectLabel ? <span>{selectLabel}</span> : <></>}
      <select
        className="p-2.5 outline-none rounded-md focus:ring-black focus:ring-2"
        id="currency"
        name="currency"
        value={selected}
        onChange={(e) => handleChange(e)}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectDropdown.defaultProps = {
  selectLabel: undefined,
};

export default SelectDropdown;
