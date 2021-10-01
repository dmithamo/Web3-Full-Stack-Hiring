import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Logo: FC = () => (
  <Link to="/" className="cursor-pointer text-2xl">
    <span className="font-black">Dai search</span>
    <span className="font-black">&trade;</span>
  </Link>
);

export default Logo;
