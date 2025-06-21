import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

interface Milestone {
  year: number;
  title: string;
  description: string;
}

const milestones: Milestone[] = [
  {
    year: 2006,
    title: 'Year Up Graduate',
    description:
      'Completed intensive Web Development and Networking program at Cambridge College, mastering HTML5, CSS3, and foundational tech skills.',
  },
  {
    year: 2018,
    title: 'General Assembly Graduate',
    description:
      'Graduated from 500+ hour Web Development Immersive, specializing in full-stack development with React, Node.js, and Ruby on Rails.',
  },
  {
    year: 2025,
    title: 'Current Focus',
    description:
      'Building modern SPAs with React, TypeScript, and Tailwind CSS, delivering user-focused, scalable web applications.',
  },
];

const About: React.FC = () => {
  return (
    <section
      className="container bg-white p-8 rounded-lg shadow-md my-10"
      aria-labelledby="about-heading"
    >
      <h2
        id="about-heading"
        className="text-3xl font-bold text-gray-800 mb-6 text-center"
      >
        About Me
      </h2>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-gray-600 mb-6">
          I'm a Boston-born full-stack developer with over 8 years of experience
          crafting dynamic web applications. From my early days tinkering with
          SEGA consoles to graduating General Assembly's Web Development
          Immersive, I've honed a passion for clean, maintainable code and
          user-centric design. My expertise spans React, TypeScript, Ruby on
          Rails, and Node.js, with a commitment to delivering scalable,
          accessible solutions.
        </p>
      </div>
      <div className="space-y-8 mt-10">
        <h3 className="text-2xl font-semibold text-[--color-primary] text-center">
          Milestones
        </h3>
        {milestones.map((milestone, index) => (
          <TimelineItem key={index} {...milestone} />
        ))}
      </div>
    </section>
  );
};

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

export default About;
