import React, { useState } from 'react';
import useKeyPress from '../utils/useKeyPress';

type Props = {
  query: string;
  // eslint-disable-next-line no-unused-vars
  onSearch: (value: string) => void;
};

const Searchbar: React.FC<Props> = ({ query, onSearch }: Props) => {
  const [value, setValue] = useState(query);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (e.target.value === '') {
      handleClear();
    }
  };

  const handleSubmit = () => {
    onSearch(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  // listen for enter an escape keypress
  useKeyPress(handleSubmit, 'enter');
  useKeyPress(handleClear, 'escape');

  return <input value={value} onChange={(e) => handleSearch(e)} />;
};

export default Searchbar;
