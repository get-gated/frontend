import { NextRequest, NextResponse } from 'next/server';

export interface Variant {
  name: string;
  rate: number;
}

export interface ExperimentConfig {
  name: string;
  route: string;
  variants: Variant[];
}

function getExperimentVariant(variants: Variant[]) {
  let value = 0;

  const variantWeights = [];

  variants.forEach((variant) => {
    value = value + variant.rate;
    variantWeights.push({ value, name: variant.name });
  });

  const n = cryptoRandom();

  const randomVariant =
    variantWeights.find((variant) => {
      return n < variant.value;
    }) ?? variants[0];

  return randomVariant.name;
}

function getCookieName(experimentName) {
  return `experiment-${experimentName}`;
}

function cryptoRandom() {
  return crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1);
}

function checkProbability(variants: Variant[]) {
  let total = 0;
  variants.forEach((variant) => (total = total + variant.rate));
  if (total !== 1) {
    throw new Error('Variant probability rate does not add up to 1');
  }
}

export function middleware(req: NextRequest, configs: ExperimentConfig[]) {
  for (let i = 0; i < configs.length; i++) {
    const { name, variants, route } = configs[i];

    checkProbability(variants);

    const { pathname } = req.nextUrl;

    if (pathname !== route) continue;

    const cookieName = getCookieName(name);

    const variantNames = variants.map((i) => i.name);

    const isValidVariant = (variant: string) => {
      return variantNames.includes(variant as any);
    };

    // Get the variant from the cookie

    let experimentVariant = req.cookies.get(cookieName);
    let hasVariantCookieSet = !!experimentVariant;

    const reqUrl = new URL(req.url);
    const overrideVariantFromQueryParams = reqUrl.searchParams.get(cookieName);

    if (
      overrideVariantFromQueryParams &&
      isValidVariant(overrideVariantFromQueryParams)
    ) {
      experimentVariant = overrideVariantFromQueryParams;
      hasVariantCookieSet = false;
    }

    // If there's no set variant or its value is invalid, get a new one
    if (!experimentVariant || !isValidVariant(experimentVariant)) {
      experimentVariant = getExperimentVariant(variants);
      hasVariantCookieSet = false;
    }

    // Create a rewrite to the page matching the variant
    const url = req.nextUrl.clone();
    url.pathname = `${route !== '/' ? route : ''}/${experimentVariant}`;
    const res = NextResponse.rewrite(url);

    // Add the variant to the response cookies if it's not there
    // or if its value was invalid
    if (!hasVariantCookieSet) {
      res.cookies.set(cookieName, experimentVariant);
    }

    return res;
  }
}
