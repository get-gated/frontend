import _slugify from 'slugify';

/**
 * Wrapper for slugify with sensible defaults applied...
 */
export const slugify = (input: string): string =>
  _slugify(input, {
    // replace spaces with replacement character, defaults to `-`
    replacement: '-',
    // remove characters that match regex, defaults to `undefined`
    remove: /[*+~.()'"!:@]/g,
    // convert to lower case, defaults to `false`
    lower: true,
    // strip special characters except replacement, defaults to `false`
    strict: true,
    // language code of the locale to use
    locale: 'en',
    // trim leading and trailing replacement chars, defaults to `true`
    trim: true,
  });
