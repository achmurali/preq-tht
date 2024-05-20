import { useRouteError } from 'react-router-dom';
import { Error404, Error500 } from '../components';

interface IProps {
  status?: number;
}

export function ErrorPage({ status }: IProps) {
  const error = useRouteError() as { status: number };

  // eslint-disable-next-line no-console
  !status && console.error(error);

  switch (status ?? error.status) {
    case 400:
      return <Error404 />;

    case 500:
      return <Error500 />;

    default:
      return <Error500 />;
  }
}
