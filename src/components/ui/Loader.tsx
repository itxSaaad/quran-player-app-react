import { ScaleLoader } from 'react-spinners';

interface LoaderProps {
  loading: 'idle' | 'loading' | 'success';
}
export default function Loader({ loading }: LoaderProps) {
  return (
    <ScaleLoader
      color="#06B6D4"
      loading={loading === 'loading'}
      height={35}
      width={4}
      radius={2}
      margin={2}
    />
  );
}
