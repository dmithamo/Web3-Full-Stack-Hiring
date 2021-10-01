import React, { useState } from 'react';
import useKeyPress from '../utils/useKeyPress';

type Props = {
  query: string;
  // eslint-disable-next-line no-unused-vars
  onSearch: (value: string) => void;
};

const Searchbar: React.FC<Props> = ({ query, onSearch }: Props) => {
  const [value, setValue] = useState(query);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="bg-white p-2 flex justify-between shadow-sm focus-within:shadow-none rounded-md focus-within:ring-2 focus-within:ring-black">
      <input
        className="p-2 outline-none w-3/4"
        placeholder="Type something"
        value={value}
        onChange={(e) => handleChange(e)}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="outline-none bg-black text-white p-2 pl-5 pr-5 rounded-md"
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
