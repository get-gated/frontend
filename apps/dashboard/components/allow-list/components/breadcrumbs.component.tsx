import React from 'react';
import { BreadCrumbs } from '@components/breadcrumbs';

const breadcrumbs = [
  { label: 'Dashboard', link: '/' },
  { label: 'Allow List', link: '/allow-list' },
];

export const Breadcrumbs = () => <BreadCrumbs breadcrumbs={breadcrumbs} />;
