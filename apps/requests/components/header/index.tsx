import React, { memo } from 'react';
import {
  Avatar,
  Box,
  Container,
  Flex,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Icon,
  useColorMode,
} from '@chakra-ui/react';

import {
  IoHelpBuoyOutline as HelpIcon,
  IoLogOutOutline as LogOutIcon,
  IoMoonOutline as DarkModeIcon,
  IoSunnyOutline as LightModeIcon,
} from 'react-icons/io5';

import { Connection } from '@gated/graphql-types';
import { useRouter } from 'next/router';

import { BrandLogo } from '@gated/ui/components';

interface IHeader {
  avatar?: string | null;
  isSignedIn?: boolean;
  name?: string;
  connections?: Partial<Connection>[];
  accountError?: Partial<Connection> | null;
  onLogout?: () => Promise<void>;
}

const Header = memo<IHeader>(
  ({ name, avatar, isSignedIn = true, onLogout }) => {
    const btnRef = React.useRef();
    const router = useRouter();

    const { colorMode, toggleColorMode } = useColorMode();
    return (
      <Container
        as={Flex}
        py={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box cursor="pointer" onClick={() => router.push('/')}>
          <BrandLogo />
        </Box>
        {isSignedIn && (
          <Box>
            <HStack
              ref={btnRef}
              cursor="pointer"
              aria-label="User menu"
              spacing={5}
            >
              <Button
                variant="link"
                leftIcon={<HelpIcon />}
                size="sm"
                as="a"
                target="_blank"
                href="https://support.gated.com"
              >
                Support
              </Button>
              <Menu>
                <MenuButton>
                  <Avatar
                    src={avatar}
                    name={name}
                    size={{ base: 'sm', md: 'md' }}
                  />
                </MenuButton>

                <MenuList dir="rtl" fontSize="md" shadow="lg">
                  <MenuItem
                    onClick={toggleColorMode}
                    closeOnSelect={false}
                    icon={
                      <Icon
                        as={
                          colorMode === 'light' ? LightModeIcon : DarkModeIcon
                        }
                        boxSize={4}
                        verticalAlign="text-bottom"
                      />
                    }
                  >
                    {colorMode === 'light' ? 'Light' : 'Dark'} Mode
                  </MenuItem>

                  <MenuDivider />
                  <MenuItem
                    onClick={onLogout}
                    icon={
                      <Icon
                        as={LogOutIcon}
                        boxSize={4}
                        verticalAlign="text-bottom"
                      />
                    }
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Box>
        )}
      </Container>
    );
  },
);

export { Header };
