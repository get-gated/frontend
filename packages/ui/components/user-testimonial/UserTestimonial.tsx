import React, { memo } from 'react';
import Image from 'next/image';
import {
  Avatar,
  AvatarContainer,
  Content,
  Meta,
  Root,
  UserTestimonialVariant,
} from './UserTestimonial.styled';
import QuoteIcon from './quote.svg';

interface UserTestimonialProps {
  avatar?: string;
  name: string;
  text: string;
  title: string;
  variant?: UserTestimonialVariant;
}

export const UserTestimonial = memo(
  ({
    avatar = '//joeschmoe.io/api/v1/random',
    name,
    text,
    title,
    variant = 'default',
  }: UserTestimonialProps) => (
    <Root
      variant={variant}
      initial={{ scale: 0.5, opacity: 0 }}
      exit={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
    >
      <Image
        src={QuoteIcon.src}
        width={QuoteIcon.width}
        height={QuoteIcon.height}
      />
      <Content>
        <h3>&ldquo;{text}&rdquo;</h3>
        <AvatarContainer>
          <Avatar src={avatar} alt={name} />
        </AvatarContainer>
      </Content>
      <Meta>
        <strong>{name}</strong>
        <span>{title}</span>
      </Meta>
    </Root>
  ),
);
