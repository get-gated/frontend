import { atom } from 'jotai';

import { ColorMode, Viewport } from '@gated/ui';

export const viewportAtom = atom<Viewport>('mobile');
export const colorModeAtom = atom<ColorMode>('light');

export const styledBasePropsAtom = atom((get) => {
  const colorMode = get(colorModeAtom);
  const viewport = get(viewportAtom);

  const isMobile = Boolean(viewport && viewport === 'mobile');
  const isTablet = Boolean(viewport && viewport === 'tablet');
  const isDesktop = Boolean(viewport && viewport === 'desktop');

  return {
    colorMode,
    viewport,
    isMobile,
    isTablet,
    isDesktop,
  };
});

interface INonprofit {
  nonprofitId: string;
  name: string;
  description: string;
  slug: string;
  category: {
    id: string;
    name: string;
  };
}

export const nonprofitAtom = atom<INonprofit>(null);
