import { Box, Circle, HStack } from '@chakra-ui/react';
import Image from 'next/image';

import React from 'react';
import NewLogo from '@components/brand-logo-new/brand-logo-new.svg';
import styled from '@emotion/styled';
import PlugFemale from '@assets/images/signup/plug-female.svg';
import PlugMale from '@assets/images/signup/plug-male.svg';
import GmailIcon from '@assets/images/signup/gmail-icon.png';

const Connection = styled.div`
  height: auto;
  width: 164px;
  position: relative;
  z-index: 0;

  .plug {
    position: absolute;
    top: -12px;
  }

  .plug-male {
    animation: full-bounce-left 1s ease-in 0s 1 normal forwards;
    left: -70px;
  }

  .plug-female {
    animation: full-bounce-right 1s ease-in 0s 1 normal forwards;
    right: -60px;
  }

  .plug-male.disconnected {
    animation: partial-bounce-left 1s ease 0s infinite alternate none;
    left: -40px;
  }

  .plug-female.disconnected {
    animation: partial-bounce-right 1s ease 0s infinite alternate none;
    right: -40px;
  }

  @keyframes partial-bounce-left {
    to {
      transform: translateX(20px);
    }
  }
  @keyframes partial-bounce-right {
    to {
      transform: translateX(-20px);
    }
  }

  @keyframes full-bounce-left {
    to {
      transform: translateX(80px);
    }
  }
  @keyframes full-bounce-right {
    to {
      transform: translateX(-70px);
    }
  }
`;

const GlowingBlue = styled.div`
  &.connected {
    animation: glowing-blue 0.8s 1s ease-in-out infinite alternate-reverse;
  }
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.25);
  @keyframes glowing-blue {
    from {
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.25),
        0 0 5px rgba(255, 255, 255, 0.25), 0 0 10px rgba(7, 81, 113, 0.25),
        0 0 15px rgba(0, 255, 255, 0.25), 0 0 20px rgba(0, 132, 188, 0.25),
        0 0 25px rgba(0, 132, 188, 0.25), 0 0 30px rgba(0, 132, 188, 0.25);
    }
    to {
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.25),
        0 0 5px rgba(191, 213, 223, 0.25), 0 0 10px rgba(191, 213, 223, 0.25),
        0 0 20px rgba(83, 150, 178, 0.25), 0 0 25px rgba(83, 150, 178, 0.25),
        0 0 30px rgba(83, 150, 178, 0.25), 0 0 40px rgba(83, 150, 178, 0.25);
    }
  }
`;

const GlowingMustard = styled.div`
  &.connected {
    animation: glowing-mustard 0.8s 1s ease-in-out infinite alternate-reverse;
  }
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.25);
  @keyframes glowing-mustard {
    from {
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.25),
        0 0 5px rgba(255, 255, 255, 0.25), 0 0 10px rgba(165, 131, 10, 0.25),
        0 0 15px rgba(222, 200, 120, 0.25), 0 0 20px rgba(204, 167, 35, 0.25),
        0 0 25px rgba(204, 167, 35, 0.25), 0 0 30px rgba(204, 167, 35, 0.25);
    }
    to {
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.25),
        0 0 5px rgba(236, 228, 200, 0.25), 0 0 10px rgba(236, 228, 200, 0.25),
        0 0 20px rgba(222, 200, 120, 0.25), 0 0 25px rgba(222, 200, 120, 0.25),
        0 0 30px rgba(222, 200, 120, 0.25), 0 0 40px rgba(222, 200, 120, 0.25);
    }
  }
`;

export const ConnectingLogos = ({ isDisconnected = false }) => {
  const stateClass = isDisconnected ? 'disconnected' : 'connected';
  return (
    <HStack spacing="-4">
      <Circle
        size="6rem"
        bgColor="white"
        zIndex={1}
        as={GlowingMustard}
        className={stateClass}
      >
        <Image
          src={NewLogo.src}
          alt="Gated Logo"
          width={NewLogo.width / 1.2}
          height={NewLogo.height / 1.2}
        />
      </Circle>

      <Connection>
        <Box className={`plug-male plug ${stateClass}`}>
          <Image
            src={PlugMale.src}
            width={PlugMale.width}
            height={PlugMale.height}
          />
        </Box>
        <Box className={`plug-female plug ${stateClass}`}>
          <Image
            style={{ position: 'absolute', left: '-100px' }}
            src={PlugFemale.src}
            width={PlugFemale.width}
            height={PlugFemale.height}
          />
        </Box>
      </Connection>

      <Circle
        size="6rem"
        bgColor="white"
        zIndex={1}
        as={GlowingBlue}
        className={stateClass}
      >
        <Image
          src={GmailIcon.src}
          alt="Gmail Logo"
          width={GmailIcon.width / 2.2}
          height={GmailIcon.height / 2.2}
        />
      </Circle>
    </HStack>
  );
};
