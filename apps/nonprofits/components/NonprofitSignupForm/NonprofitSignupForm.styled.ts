import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Disclosure = styled(motion.p)`
  margin: 1rem 0;
  font-size: 12px;

  & a {
    color: inherit;
    font-weight: 600;
    text-decoration: underline;
  }
`;
