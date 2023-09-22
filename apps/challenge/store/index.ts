import { atom } from 'jotai';
import { IUseSenderChallengeResponse } from '@hooks/use-sender-challenge.hook';

export enum Action {
  Donate = 'donate',
  Bypass = 'expected',
}

export const actionAtom = atom<Action>(Action.Donate);
export const tokenAtom = atom<string | boolean>(false);
export const dataAtom = atom<IUseSenderChallengeResponse | boolean>(false);
