import React, { useState } from 'react';
import { AspectRatio, Box, Center, Image } from '@chakra-ui/react';
import VideoPreview from '@assets/video-placeholder.jpg';

interface InfoVideoViewProps {
  width: any;
}

export const InfoVideoView = ({ width = 266 }: InfoVideoViewProps) => {
  const [showPoster, setShowPoster] = useState(true);
  const handlePosterClick = () => {
    setShowPoster(false);
  };

  return (
    <Center w={width}>
      <AspectRatio w="100%" ratio={16 / 9}>
        {(showPoster && (
          <Image
            data-testid="PreflightVideoCTA--desktop"
            rounded={6}
            w="10"
            h="10"
            src={VideoPreview.src}
            alt="Watch how gated works"
            onClick={handlePosterClick}
          />
        )) || (
          <Box
            data-testid="PreflightVideoCTA--mobile"
            as="iframe"
            rounded={6}
            onClick={handlePosterClick}
            allowFullScreen
            src="https://player.vimeo.com/video/602127721?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;h=67bd12d1d0"
          />
        )}
      </AspectRatio>
    </Center>
  );
};
