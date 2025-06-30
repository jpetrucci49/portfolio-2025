import { motion } from 'framer-motion';
import type { ResumeType } from '../../types/resume';

interface ResumePreviewProps {
  resume: ResumeType;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => (
  <div className="max-w-2xl mx-auto space-y-6">
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-[--color-primary] mb-4">
        Experience
      </h3>
      {resume.experience.map((exp, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <h4 className="text-lg font-medium text-gray-800">
            {exp.title} at {exp.company}
          </h4>
          <p className="text-sm text-gray-500">
            {exp.startDate} - {exp.endDate || 'Present'}
          </p>
          <p className="text-gray-600">{exp.description}</p>
        </div>
      ))}
    </motion.section>
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-[--color-primary] mb-4">
        Education
      </h3>
      {resume.education.map((edu, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <h4 className="text-lg font-medium text-gray-800">{edu.degree}</h4>
          <p className="text-sm text-gray-500">
            {edu.institution}, {edu.startDate} - {edu.endDate}
          </p>
        </div>
      ))}
    </motion.section>
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-[--color-primary] mb-4">
        Skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {resume.skills.map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.section>
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
    >
      <h3 className="text-xl font-semibold text-[--color-primary] mb-4">
        Contact
      </h3>
      <p className="text-gray-600">
        Email:{' '}
        <a
          href={`mailto:${resume.contact.email}`}
          className="text-[--color-primary] hover:underline"
        >
          {resume.contact.email}
        </a>
      </p>
      <p className="text-gray-600">
        LinkedIn:{' '}
        <a
          href={resume.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[--color-primary] hover:underline"
        >
          {resume.contact.linkedin}
        </a>
      </p>
    </motion.section>
  </div>
);

export default ResumePreview;
