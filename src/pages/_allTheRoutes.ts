import { FC } from 'react';
import Homepage from './Homepage';
import DefaultLayout from '../components/DefaultLayout';
import NotFoundPage from './NotFoundPage';

export type Route = {
  name: string;
  path: string;
  component: FC;
  layout: FC<any>;
};

const ALL_ROUTES: Route[] = [
  {
    name: 'Home',
    path: '/',
    component: Homepage,
    layout: DefaultLayout,
  },
  {
    name: '404',
    path: '*',
    component: NotFoundPage,
    layout: DefaultLayout,
  },
];

export default ALL_ROUTES;
