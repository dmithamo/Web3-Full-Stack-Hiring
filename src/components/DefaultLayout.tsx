import React, { FC } from 'react';
import Nav from './Nav';

type Props = {
  children: FC;
};

const DefaultLayout: FC<Props> = ({ children }: Props) => (
  <div className="bg-gray-200 w-full h-full min-h-screen">
    <div className="pl-10 pr-10 pt-5 pb-2 sm:w-full md:w-1/2 mx-auto">
      <Nav />
      <div className="pt-5">{children}</div>
    </div>
  </div>
);

export default DefaultLayout;
