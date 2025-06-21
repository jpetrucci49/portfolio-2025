import { useState } from 'react';

const skills = {
  Frontend: [
    'React',
    'Redux-Saga',
    'JavaScript (ES6+)',
    'TypeScript',
    'HTML5',
    'CSS3',
    'SASS',
    'Tailwind CSS',
    'Bootstrap',
    'Foundation',
    'jQuery',
    'AJAX',
    'JSON',
    'XML',
  ],
  Backend: [
    'Ruby',
    'RoR',
    'Python',
    'REST APIs',
    'Node.js',
    'Express.js',
    'GraphQL',
    'Django',
  ],
  Databases: ['SQL', 'PostgreSQL', 'MongoDB'],
  Tools: ['Jest', 'Puppeteer', 'npm', 'Webpack', 'Vite', 'Git/GitHub'],
};

const Skills: React.FC = () => {
  const [openCategories, setOpenCategories] = useState<string[]>(
    Object.keys(skills)
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
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Skills</h2>
      <div className="space-y-2">
        {Object.entries(skills).map(([category, skillList]) => (
          <div
            key={category}
            className="border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow duration-200 animate-fadeIn"
          >
            <button
              onClick={() => toggleCategory(category)}
              className="text-xl font-semibold text-[--color-primary] cursor-pointer w-full text-left flex items-center gap-2 bg-gray-50 py-2 px-3 rounded"
              aria-expanded={openCategories.includes(category)}
            >
              <span
                className={`transform transition-transform duration-400 ${
                  openCategories.includes(category) ? 'rotate-90' : 'rotate-0'
                }`}
              >
                ▶
              </span>
              {category}
            </button>
            <div
              className={`skill-list ${
                openCategories.includes(category) ? 'open' : ''
              }`}
            >
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-2">
                {skillList.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 border-2 border-gray-300 p-3 rounded text-center text-gray-800 hover:bg-[--color-primary] hover:text-gray-800 hover:scale-105 transition-all duration-200"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
