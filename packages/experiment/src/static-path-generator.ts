export function staticPathsGenerator(variants) {
  return {
    paths: Object.values(variants).map((variant) => ({
      params: { variant },
    })),
    fallback: false,
  };
}
