/**
 * Checks if user is in webview by looking at the userAgent.
 * In IOS, the userAgent always includes the string "Safari" outside of a webview.
 * In Android, the userAgent always includes the string "vw" inside of a webview.
 */
export const isInWebview = () => {
  if (typeof window === 'undefined') return false;
  const standalone =
      'standalone' in window.navigator && window.navigator['standalone'],
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test(userAgent),
    ios = /iphone|ipod|ipad/.test(userAgent);
  if (ios) {
    if (!standalone && safari) {
      return false;
    } else if (!standalone && !safari) {
      return true;
    }
  } else {
    if (userAgent.includes('wv')) {
      return true;
    } else {
      return false;
    }
  }
};
