import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { FaReact, FaNodeJs, FaDatabase, FaTools } from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiRuby,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiSass,
  SiBootstrap,
  SiJquery,
  SiGraphql,
  SiDjango,
  SiPostgresql,
  SiMongodb,
  SiJest,
  SiWebpack,
  SiVite,
  SiGit,
} from 'react-icons/si';
import { TbBrandRedux } from 'react-icons/tb';

Modal.setAppElement('#root');

interface Skill {
  name: string;
  years: number;
  icon: React.ReactNode;
  description: string;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    icon: <FaReact className="text-blue-600" />,
    skills: [
      {
        name: 'React',
        years: 5,
        icon: <FaReact className="text-blue-600" />,
        description:
          'Built dynamic SPAs with component-based architecture and state management.',
      },
      {
        name: 'Redux-Saga',
        years: 3,
        icon: <TbBrandRedux className="text-purple-600" />,
        description: 'Managed complex async flows in React applications.',
      },
      {
        name: 'JavaScript (ES6+)',
        years: 8,
        icon: <SiJavascript className="text-yellow-500" />,
        description: 'Developed interactive features using modern ES6+ syntax.',
      },
      {
        name: 'TypeScript',
        years: 5,
        icon: <SiTypescript className="text-blue-800" />,
        description:
          'Enhanced code reliability with static typing in React projects.',
      },
      {
        name: 'HTML5',
        years: 8,
        icon: <SiHtml5 className="text-orange-600" />,
        description: 'Crafted semantic, accessible web structures.',
      },
      {
        name: 'CSS3',
        years: 8,
        icon: <SiCss3 className="text-blue-500" />,
        description: 'Styled responsive, cross-browser layouts.',
      },
      {
        name: 'SASS',
        years: 4,
        icon: <SiSass className="text-pink-500" />,
        description: 'Streamlined CSS with modular, reusable styles.',
      },
      {
        name: 'Tailwind CSS',
        years: 2,
        icon: <SiTailwindcss className="text-teal-500" />,
        description: 'Designed utility-first, responsive UIs efficiently.',
      },
      {
        name: 'Bootstrap',
        years: 4,
        icon: <SiBootstrap className="text-purple-600" />,
        description: 'Built responsive layouts with pre-built components.',
      },
      {
        name: 'Foundation',
        years: 3,
        icon: <SiBootstrap className="text-gray-600" />,
        description: 'Created mobile-first designs with flexible grids.',
      },
      {
        name: 'jQuery',
        years: 5,
        icon: <SiJquery className="text-blue-700" />,
        description: 'Simplified DOM manipulation and event handling.',
      },
      {
        name: 'AJAX',
        years: 5,
        icon: <SiJavascript className="text-yellow-500" />,
        description: 'Enabled asynchronous data fetching for dynamic UIs.',
      },
      {
        name: 'JSON',
        years: 6,
        icon: <SiJavascript className="text-yellow-500" />,
        description:
          'Structured data for APIs and client-server communication.',
      },
      {
        name: 'XML',
        years: 4,
        icon: <SiJavascript className="text-gray-600" />,
        description: 'Handled structured data for legacy systems.',
      },
    ],
  },
  {
    name: 'Backend',
    icon: <FaNodeJs className="text-green-600" />,
    skills: [
      {
        name: 'Ruby',
        years: 4,
        icon: <SiRuby className="text-red-600" />,
        description: 'Developed robust backend logic with Ruby.',
      },
      {
        name: 'RoR',
        years: 4,
        icon: <SiRuby className="text-red-600" />,
        description: 'Built scalable web apps with Ruby on Rails.',
      },
      {
        name: 'Python',
        years: 3,
        icon: <SiPython className="text-blue-500" />,
        description: 'Created backend scripts and APIs with Python.',
      },
      {
        name: 'REST APIs',
        years: 6,
        icon: <FaNodeJs className="text-green-600" />,
        description:
          'Designed and consumed RESTful APIs for seamless integration.',
      },
      {
        name: 'Node.js',
        years: 6,
        icon: <FaNodeJs className="text-green-600" />,
        description: 'Developed server-side logic with Node.js.',
      },
      {
        name: 'Express.js',
        years: 4,
        icon: <FaNodeJs className="text-green-600" />,
        description: 'Built fast, minimalist APIs with Express.',
      },
      {
        name: 'GraphQL',
        years: 2,
        icon: <SiGraphql className="text-pink-600" />,
        description: 'Implemented flexible, query-driven APIs.',
      },
      {
        name: 'Django',
        years: 2,
        icon: <SiDjango className="text-green-800" />,
        description: 'Developed secure web apps with Django.',
      },
    ],
  },
  {
    name: 'Databases',
    icon: <FaDatabase className="text-green-800" />,
    skills: [
      {
        name: 'SQL',
        years: 6,
        icon: <SiPostgresql className="text-blue-600" />,
        description: 'Wrote efficient queries for relational databases.',
      },
      {
        name: 'PostgreSQL',
        years: 4,
        icon: <SiPostgresql className="text-blue-600" />,
        description: 'Managed scalable, relational database systems.',
      },
      {
        name: 'MongoDB',
        years: 6,
        icon: <SiMongodb className="text-green-600" />,
        description: 'Designed NoSQL databases for flexible data storage.',
      },
    ],
  },
  {
    name: 'Tools',
    icon: <FaTools className="text-gray-600" />,
    skills: [
      {
        name: 'Jest',
        years: 3,
        icon: <SiJest className="text-red-600" />,
        description: 'Wrote unit and integration tests for reliable code.',
      },
      {
        name: 'Puppeteer',
        years: 3,
        icon: <SiJest className="text-green-600" />,
        description: 'Automated browser testing and scraping.',
      },
      {
        name: 'npm',
        years: 6,
        icon: <SiJavascript className="text-yellow-500" />,
        description: 'Managed dependencies and scripts for projects.',
      },
      {
        name: 'Webpack',
        years: 4,
        icon: <SiWebpack className="text-blue-500" />,
        description: 'Optimized module bundling for production.',
      },
      {
        name: 'Vite',
        years: 1,
        icon: <SiVite className="text-purple-600" />,
        description: 'Leveraged fast build tools for modern development.',
      },
      {
        name: 'Git/GitHub',
        years: 6,
        icon: <SiGit className="text-orange-600" />,
        description: 'Managed version control and collaboration.',
      },
    ],
  },
];

const Skills: React.FC = () => {
  const [openCategories, setOpenCategories] = useState<string[]>(
    skillCategories.map(category => category.name)
  );
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const openModal = (skill: Skill) => {
    setSelectedSkill(skill);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedSkill(null);
  };

  return (
    <section className="container bg-white p-8 rounded-lg shadow-md my-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Skills
      </h2>
      <div className="space-y-4">
        {skillCategories.map(category => (
          <div
            key={category.name}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <button
              onClick={() => toggleCategory(category.name)}
              className="text-xl font-semibold text-[--color-primary] w-full text-left flex items-center gap-2 py-2 px-3 rounded hover:bg-gray-50"
              aria-expanded={openCategories.includes(category.name)}
            >
              {category.icon}
              {category.name}
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openCategories.includes(category.name) ? 'auto' : 0,
                opacity: openCategories.includes(category.name) ? 1 : 0,
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                {category.skills.map(skill => (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-800 hover:scale-105 hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => openModal(skill)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && openModal(skill)}
                    aria-label={`View details for ${skill.name}`}
                  >
                    {skill.icon}
                    <span>{skill.name}</span>
                    <span className="text-sm text-gray-500">
                      ({skill.years} yrs)
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-8 rounded-lg max-w-md mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-gray-800/30 backdrop-blur-sm flex items-center justify-center"
        aria={{
          labelledby: 'modal-heading',
          describedby: 'modal-description',
        }}
      >
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2
              id="modal-heading"
              className="text-2xl font-bold text-gray-800 mb-4"
            >
              {selectedSkill.name}
            </h2>
            <p id="modal-description" className="text-gray-600 mb-4">
              {selectedSkill.description}
            </p>
            <p className="text-gray-600 mb-4">
              {selectedSkill.years} years professional experience
            </p>
            <button
              onClick={closeModal}
              className="bg-[--color-primary] text-white px-4 py-2 rounded hover:bg-blue-700"
              aria-label="Close skill details modal"
            >
              Close
            </button>
          </motion.div>
        )}
      </Modal>
    </section>
  );
};

export default Skills;
