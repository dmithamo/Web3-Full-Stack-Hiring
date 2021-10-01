import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ALL_ROUTES from '../pages/_allTheRoutes';

const Nav: FC = () => (
  <nav>
    {ALL_ROUTES.filter((r) => !['*', '/'].includes(r.path.toLowerCase())).map(
      ({ name, path }) => (
        <NavLink className="mr-5" strict to={path} key={path}>
          {name}
        </NavLink>
      ),
    )}
  </nav>
);

export default Nav;
