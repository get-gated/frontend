# Experiments
Experiments allow you to run A/B tests on pages. Users are locked into an experiment variant at random with a specified probability via config.

## Create an experiment
Create a file named `[variant].tsx` at the root of your desired path for the page you are running the experiment on (eg: `/pages/hello/[variant].tsx` for a page hosted at `/hello`). Then create a file at `/experiments/hello.ts` to house your experiment configuration. Populate the files with the following boilerplate:

### `/pages/hello/[variant].tsx`
```tsx
import { staticPathsGenerator, useVariant } from '@gated/experiment';
import { helloPageExperiment, HelloPageVariant } from '@/experiments/hello';

export default function HomePage() {
  const variant = useVariant<HelloPageVariant>(homePageExperiment.name);

  switch (variant) {
    case HelloPageVariant.Control:
      return <>Control View</>;
    case HelloPageVariant.AltView:
      return <>Alternate View to run an experiment with</>;
  }
}

export async function getStaticPaths() {
  return staticPathsGenerator(HelloPageVariant);
}
export async function getStaticProps() {
  return { props: {} };
}
```
### `[/experiments/hello.ts]`
```ts
import { ExperimentConfig } from '@gated/experiment';

export enum HelloPageVariant {
  Control = 'control',
  AltView = 'alt-view',
}
export const homePageExperiment: ExperimentConfig = {
  name: 'hello', //identifier for the page you are running the experiment on
  route: '/', //route at which your page lives
  variants: [
    {
      name: HelloPageVariant.Control,
      rate: 0.75,
    },
    { name: HelloPageVariant.AltView, rate: 0.25 },
  ],
};
```

Finally, create a `middleware.ts` file and bootstrap your experiments with each experiment's configuration, and the request context.

### `[/middleware.ts]`
```ts
import { middleware as experimentMiddlware } from '@gated/experiment';
import { helloPageExperiment } from './experiments/hello';

export const config = {
  unstable_allowDynamic: [
    '**/node_modules/@firebase/**',
  ],
};

export default function middleware(req) {
  return experimentMiddlware(req, [experimentMiddlware]);
}

```
