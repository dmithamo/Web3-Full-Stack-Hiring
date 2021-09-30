import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const NotFoundPage: FC = () => (
  <div>
    <h2>Nothing to see here</h2>
    <NavLink to="/">Go home</NavLink>
  </div>
);

export default NotFoundPage;
