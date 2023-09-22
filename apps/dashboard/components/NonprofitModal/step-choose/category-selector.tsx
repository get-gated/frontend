import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  MenuProps,
  Spacer,
  Text,
} from '@chakra-ui/react';

import {
  IoChevronDown,
  IoListOutline as AllIcon,
  IoStarOutline as PopularIcon,
} from 'react-icons/io5';

import {
  NonprofitCategory,
  useNonprofitCategoriesQuery,
} from '@gated/graphql-types';
import { useNonprofit } from '@components/NonprofitModal/context';
import { gql } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react';

gql`
  query NonprofitCategories {
    nonprofitCategories {
      nonprofitCategories {
        id
        name
      }
    }
  }
`;

export const CategorySelector = (props: Omit<MenuProps, 'children'>) => {
  const { setCategoryId, categoryId } = useNonprofit();

  const { data, loading } = useNonprofitCategoriesQuery({
    fetchPolicy: 'cache-first',
  });

  const [categories, setCategories] = useState<
    Pick<NonprofitCategory, 'id' | 'name'>[]
  >([]);

  useEffect(() => {
    if (!data) return;
    const newCategories = data.nonprofitCategories.nonprofitCategories.filter(
      (category) => category.name !== 'blank',
    );
    setCategories(newCategories);
  }, [data]);

  const displayName = useMemo(() => {
    if (categoryId === 'popular') return 'Popular';
    if (!categoryId) return 'All';

    return categories.find((i) => i.id === categoryId)?.name;
  }, [categoryId, categories]);

  const icon = (categoryId) => {
    switch (categoryId) {
      case 'popular':
        return <PopularIcon />;
      case '':
        return <AllIcon />;
      default:
        return null;
    }
  };

  const CategoryItem = ({ id, name }: { id: string; name: string }) => {
    const categoryIcon = icon(id);
    return (
      <MenuItem
        onClick={() => setCategoryId(id)}
        bg={id === categoryId && 'bg-active'}
      >
        {categoryIcon && <Box pr={2}>{categoryIcon}</Box>}
        {name}
      </MenuItem>
    );
  };

  return (
    <Menu {...props}>
      <Flex alignItems="center" w={{ base: 'full', sm: 'auto' }}>
        <Text textStyle="label" pr={2}>
          Category:{' '}
        </Text>
        <Spacer />
        <MenuButton
          as={Button}
          borderRadius="lg"
          rightIcon={<IoChevronDown />}
          variant="outline"
          bgColor="bg-surface"
          isLoading={loading}
          leftIcon={icon(categoryId)}
        >
          {displayName}
        </MenuButton>
      </Flex>
      <MenuList>
        <CategoryItem name="Popular" id="popular" />
        <MenuDivider />
        <MenuGroup title="Categories">
          {categories
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((category) => (
              <CategoryItem
                key={category.id}
                name={category.name}
                id={category.id}
              />
            ))}
        </MenuGroup>
        <MenuDivider />
        <CategoryItem name="All" id="" />
      </MenuList>
    </Menu>
  );
};
