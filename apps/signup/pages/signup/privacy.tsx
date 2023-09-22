import { PrivacyPage as Privacy } from '@components/signup/PrivacyPage';

import { Meta } from '@gated/ui/components';
import React from 'react';
import { HighContrastStyle } from '@components/high-contrast-style';
export default function PrivacyPage() {
  return (
    <>
      <HighContrastStyle />
      <Meta title="Privacy" description="How Gated protects your privacy." />
      <Privacy />
    </>
  );
}
