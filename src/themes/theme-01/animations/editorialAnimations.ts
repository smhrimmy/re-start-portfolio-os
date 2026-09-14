import { Variants } from 'framer-motion';

export const pageIssueTransition: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
};

export const editorialRuleExpand: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const chapterSequentialContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const chapterSequentialItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export const cropMaskReveal: Variants = {
  initial: { clipPath: 'inset(100% 0% 0% 0%)' },
  animate: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const modalEditorialSlide: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.97, y: 5, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
};
