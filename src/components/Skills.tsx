import { useState } from 'react';
import { motion } from 'framer-motion';
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

interface Skill {
  name: string;
  years: number;
  icon: React.ReactNode;
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
      { name: 'React', years: 5, icon: <FaReact className="text-blue-600" /> },
      {
        name: 'Redux-Saga',
        years: 3,
        icon: <TbBrandRedux className="text-purple-600" />,
      },
      {
        name: 'JavaScript (ES6+)',
        years: 8,
        icon: <SiJavascript className="text-yellow-500" />,
      },
      {
        name: 'TypeScript',
        years: 5,
        icon: <SiTypescript className="text-blue-800" />,
      },
      {
        name: 'HTML5',
        years: 8,
        icon: <SiHtml5 className="text-orange-600" />,
      },
      { name: 'CSS3', years: 8, icon: <SiCss3 className="text-blue-500" /> },
      { name: 'SASS', years: 4, icon: <SiSass className="text-pink-500" /> },
      {
        name: 'Tailwind CSS',
        years: 2,
        icon: <SiTailwindcss className="text-teal-500" />,
      },
      {
        name: 'Bootstrap',
        years: 4,
        icon: <SiBootstrap className="text-purple-600" />,
      },
      {
        name: 'Foundation',
        years: 3,
        icon: <SiBootstrap className="text-gray-600" />,
      },
      {
        name: 'jQuery',
        years: 5,
        icon: <SiJquery className="text-blue-700" />,
      },
      {
        name: 'AJAX',
        years: 5,
        icon: <SiJavascript className="text-yellow-500" />,
      },
      {
        name: 'JSON',
        years: 6,
        icon: <SiJavascript className="text-yellow-500" />,
      },
      {
        name: 'XML',
        years: 4,
        icon: <SiJavascript className="text-gray-600" />,
      },
    ],
  },
  {
    name: 'Backend',
    icon: <FaNodeJs className="text-green-600" />,
    skills: [
      { name: 'Ruby', years: 4, icon: <SiRuby className="text-red-600" /> },
      { name: 'RoR', years: 4, icon: <SiRuby className="text-red-600" /> },
      {
        name: 'Python',
        years: 3,
        icon: <SiPython className="text-blue-500" />,
      },
      {
        name: 'REST APIs',
        years: 6,
        icon: <FaNodeJs className="text-green-600" />,
      },
      {
        name: 'Node.js',
        years: 6,
        icon: <FaNodeJs className="text-green-600" />,
      },
      {
        name: 'Express.js',
        years: 4,
        icon: <FaNodeJs className="text-green-600" />,
      },
      {
        name: 'GraphQL',
        years: 2,
        icon: <SiGraphql className="text-pink-600" />,
      },
      {
        name: 'Django',
        years: 2,
        icon: <SiDjango className="text-green-800" />,
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
      },
      {
        name: 'PostgreSQL',
        years: 4,
        icon: <SiPostgresql className="text-blue-600" />,
      },
      {
        name: 'MongoDB',
        years: 6,
        icon: <SiMongodb className="text-green-600" />,
      },
    ],
  },
  {
    name: 'Tools',
    icon: <FaTools className="text-gray-600" />,
    skills: [
      { name: 'Jest', years: 3, icon: <SiJest className="text-red-600" /> },
      {
        name: 'Puppeteer',
        years: 3,
        icon: <SiJest className="text-green-600" />,
      },
      {
        name: 'npm',
        years: 6,
        icon: <SiJavascript className="text-yellow-500" />,
      },
      {
        name: 'Webpack',
        years: 4,
        icon: <SiWebpack className="text-blue-500" />,
      },
      { name: 'Vite', years: 1, icon: <SiVite className="text-purple-600" /> },
      {
        name: 'Git/GitHub',
        years: 6,
        icon: <SiGit className="text-orange-600" />,
      },
    ],
  },
];

const Skills: React.FC = () => {
  const [openCategories, setOpenCategories] = useState<string[]>(
    skillCategories.map(category => category.name)
  );

  const toggleCategory = (category: string) => {
    setOpenCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
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
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-gray-800 hover:scale-105 hover:shadow-md transition-all duration-200"
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
    </section>
  );
};

export default Skills;
