import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import type { Milestone } from '../../types/about';

const TimelineItem: React.FC<Milestone> = ({ year, title, description }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="flex items-start gap-6"
      role="listitem"
      aria-label={`Milestone: ${title} in ${year}`}
    >
      <div className="flex-shrink-0 text-right">
        <span className="text-lg font-bold text-[--color-primary]">{year}</span>
      </div>
      <div className="flex-1 border-l-2 border-gray-200 pl-6">
        <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
