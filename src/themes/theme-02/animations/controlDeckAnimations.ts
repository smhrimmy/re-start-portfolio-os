import { Variants } from 'framer-motion';

export const systemStateTransition: Variants = {
  initial: { opacity: 0, scale: 0.98, z: -20 },
  animate: { opacity: 1, scale: 1, z: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.98, z: -10, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

export const panelSequentialContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

export const panelSequentialItem: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export const deckCardPerspectiveVariants: Variants = {
  active: {
    scale: 1,
    rotateY: 0,
    z: 0,
    x: 0,
    opacity: 1,
  },
  left: {
    scale: 0.82,
    rotateY: 18,
    z: -100,
    x: -120,
    opacity: 0.6,
  },
  right: {
    scale: 0.82,
    rotateY: -18,
    z: -100,
    x: 120,
    opacity: 0.6,
  },
  hidden: {
    scale: 0.7,
    rotateY: 0,
    z: -200,
    x: 0,
    opacity: 0,
  },
};

export const hardwareBootSequence: Variants = {
  initial: { opacity: 0, scaleY: 0 },
  animate: { opacity: 1, scaleY: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
