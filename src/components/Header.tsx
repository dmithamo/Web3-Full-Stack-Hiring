import React, { FC } from 'react';
import Logo from './Logo';
import Nav from './Nav';

const Header: FC = () => (
  <div className="flex justify-between pt-5 pb-5 align-middle border-b border-gray-300">
    <Logo />
    <Nav />
  </div>
);

export default Header;
