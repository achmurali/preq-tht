export function suspenderUtil(func: () => Promise<any>) {
  let status = 'pending';
  let result: any;

  const suspender = func().then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    }
  );

  const read = () => {
    switch (status) {
      case 'pending':
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw suspender;
      case 'error':
        throw result;
      default:
        return result;
    }
  };

  return { read };
}
