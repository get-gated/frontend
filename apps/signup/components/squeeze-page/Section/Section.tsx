/* eslint-disable react/no-children-prop */
import { colorModeAtom, viewportAtom } from '@/store';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Root, Container } from './Section.styled';
import { useState } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

export const Section = ({
  heading,
  body,
  image,
  imageAlt,
  alignment = 'left',
}: any) => {
  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const imageHeight = useBreakpointValue({ base: '300px', md: '460px' });

  return (
    <Root {...styledBaseProps}>
      <Container
        alignment={viewport !== 'mobile' && alignment}
        {...styledBaseProps}
      >
        <Markdown className="heading" children={heading as string} />
        <Markdown className="body" children={body as string} />
      </Container>

      {image && (
        <motion.div
          initial={{
            opacity: 0,
            transform: 'translateY(40px)',
            filter: 'blur(2px)',
          }}
          animate={
            isLoaded &&
            isInView && {
              transform: 'translateY(0px)',
              opacity: 1,
              filter: 'blur(0)',
            }
          }
          transition={{ duration: 1, ease: 'easeIn' }}
          viewport={{ once: true }}
          onViewportEnter={() => setIsInView(true)}
          style={{
            position: 'relative',
            width: '100%',
            height: imageHeight,
          }}
        >
          <Image
            src={image.src}
            alt={imageAlt ?? ''}
            layout="fill"
            objectFit="contain"
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>
      )}
    </Root>
  );
};
