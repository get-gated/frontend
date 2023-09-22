import { useAuth } from '@gated/app';
import { Spinner } from '@gated/ui/components';

export function WaitForReady({ children }) {
  const { isReady } = useAuth();
  if (!isReady) return <Spinner />;
  return children;
}
