import { memo } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react';
import Link from 'next/link';
type BreadCrumb = {
  label: string;
  link?: string;
};

interface IBreadCrumbs {
  breadcrumbs: BreadCrumb[];
}

const BreadCrumbs = memo<IBreadCrumbs>(({ breadcrumbs }) => {
  return (
    <Breadcrumb textStyle="footnote">
      {breadcrumbs?.map((breadcrumb) => {
        return (
          <BreadcrumbItem key={breadcrumb.label}>
            {breadcrumb.link ? (
              <BreadcrumbLink as={Link} href={breadcrumb.link}>
                {breadcrumb.label}
              </BreadcrumbLink>
            ) : (
              <Heading size={'xs'}>{breadcrumb.label}</Heading>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
});

export { BreadCrumbs };
