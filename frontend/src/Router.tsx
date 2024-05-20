import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';
import { ErrorPage } from './pages';
import { useRootStore } from './store';

const Home = lazy(async () => ({
  default: (await import('./pages/Home')).HomePage,
}));

const InvestorFirm = lazy(async () => ({
  default: (await import('./pages/InvestorFirm')).InvestorFirmPage,
}));

const router = createBrowserRouter([
  {
    path: '*',
    element: <ErrorPage status={400} />,
  },
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/investors/:firmId',
    element: <InvestorFirm />,
    errorElement: <ErrorPage />,
    loader: async ({ params }) => {
      const promises = [];

      if (!useRootStore.getState().investors) {
        promises.push(useRootStore.getState().setInvestors());
      }

      if (params.firmId && !useRootStore.getState().commitment[params.firmId]) {
        promises.push(useRootStore.getState().setCommitment(params.firmId, 'hf'));
      }

      const data = Promise.all(promises);

      return defer({ data });
    },
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
