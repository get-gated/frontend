export enum App {
  Signup = 'signup',
  Dashboard = 'dashboard',
  Challenge = 'challenge',
  Nonprofits = 'nonprofits',
  Admin = 'admin',
  User = 'user',
}

export function useAppLink() {
  const link = (app: App, path: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    return `${origin}${path}`;
  };

  return link;
}
