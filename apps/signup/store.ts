import { atom } from 'jotai';
import { ColorMode } from '@gated/ui';

export const viewportAtom = atom<string>('mobile');
export const colorModeAtom = atom<ColorMode>('light');
