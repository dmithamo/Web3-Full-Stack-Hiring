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

    // reset value of query on change
    onSearch('');
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

  return (
    <div>
      <input
        className="p-2"
        placeholder="Type something and press the enter key"
        value={value}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default Searchbar;
