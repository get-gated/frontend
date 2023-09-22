import { MutableRefObject } from 'react';

export interface ChurnQuestionnaireContentProps {
  leastDestructiveRef: MutableRefObject<any>;
  next: () => void;
  back?: () => void;
  close?: () => void;
  email?: string;
}
