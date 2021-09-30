import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ALL_ROUTES from '../pages/_allTheRoutes';

const Nav: FC = () => (
  <nav>
    {ALL_ROUTES.filter((r) => r.path !== '*').map(({ name, path }) => (
      <NavLink strict to={path} key={path}>
        {name}
      </NavLink>
    ))}
  </nav>
);

export default Nav;
