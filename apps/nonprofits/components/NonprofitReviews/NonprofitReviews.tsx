import React from 'react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { reviews } from './reviews-data';
import {
  Actions,
  Avatar,
  Avatars,
  Container,
  Control,
  Header,
  Review,
  Root,
} from './NonprofitReviews.styled';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    };
  },
};

export const NonprofitReviews = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const reviewIndex = wrap(0, reviews.length, page);
  const review = reviews[reviewIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <Root>
      <Header>
        <Avatars>
          {reviews.map((r, idx) => {
            return (
              <Avatar
                key={r.name}
                // TODO: Fix me...
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                src={r.avatar}
                isActive={idx === reviewIndex}
                alt={r.name}
              />
            );
          })}
        </Avatars>
        <Actions>
          <Control onClick={() => paginate(-1)}>
            <FaChevronLeft />
          </Control>
          <Control onClick={() => paginate(1)}>
            <FaChevronRight />
          </Control>
        </Actions>
      </Header>
      <Container>
        <AnimatePresence
          initial={false}
          custom={direction}
          presenceAffectsLayout
        >
          <Review
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 },
            }}
          >
            <blockquote>
              <p>&quot;{review.text}&quot;</p>
              <figcaption>&mdash;&nbsp;{review.name}</figcaption>
            </blockquote>
          </Review>
        </AnimatePresence>
      </Container>
    </Root>
  );
};
