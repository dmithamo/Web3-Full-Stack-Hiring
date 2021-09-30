import React, { FC } from 'react';
import Nav from './Nav';

type Props = {
  children: FC;
};

const DefaultLayout: FC<Props> = ({ children }: Props) => (
  <div style={{ padding: '2rem' }}>
    <Nav />
    <div>{children}</div>
  </div>
);

export default DefaultLayout;
