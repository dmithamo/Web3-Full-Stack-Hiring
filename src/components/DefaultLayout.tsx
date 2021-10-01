import React, { FC } from 'react';
import Header from './Header';

type Props = {
  children: FC;
};

const DefaultLayout: FC<Props> = ({ children }: Props) => (
  <div className="bg-gray-200 w-full h-full min-h-screen flex flex-col justify-between align-middle">
    <div className="w-full md:w-3/4 lg:w-1/3 mx-auto pl-5 pr-5 md:pl-0 md:pr-0">
      <Header />
      <div className="pt-5">{children}</div>
    </div>
    <footer className="w-max mx-auto p-1">
      <a
        className="text-gray-400 hover:text-black"
        target="_blank"
        rel="noreferrer noopener"
        href="https://github.com/dmithamo"
      >
        &copy;dmithamo
      </a>
    </footer>
  </div>
);

export default DefaultLayout;
