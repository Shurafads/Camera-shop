import { CSSProperties } from 'react';
import { PuffLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'block',
  margin: '25% auto',
};

function LoadingPage() {

  return (
    <PuffLoader
      data-testid="spinner"
      color={'#7575e2'}
      cssOverride={override}
      size={75}
    />
  );
}

export default LoadingPage;
