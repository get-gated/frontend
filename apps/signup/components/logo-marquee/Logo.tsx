import Image from 'next/image';

import { ImageWrapper } from './LogoMarquee.styled';
import { GatedClientLogo } from './logos';
import { useAtomValue } from 'jotai';
import { colorModeAtom, viewportAtom } from '@/store';

export const Logo = ({ logo }: { logo: GatedClientLogo }) => {
  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };
  return (
    <ImageWrapper {...styledBaseProps}>
      <Image
        style={{ maxWidth: '50%' }}
        src={logo.image}
        layout="fill"
        objectFit="contain"
        alt={logo.caption}
        priority={true}
      />
    </ImageWrapper>
  );
};
