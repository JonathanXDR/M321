import { Spinner } from '@primer/react';

function LoadingSpinner() {
  return (
    <div className="d-flex flex-justify-center flex-items-center flex-column width-full height-full">
      <Spinner />
    </div>
  );
}

export default LoadingSpinner;
