import { Layout } from '@components/consent/layout';
import { Spinner } from '@gated/ui/components';

export default function ConsentLoadingView() {
  return (
    <Layout>
      <Spinner />
    </Layout>
  );
}
