import { useState } from 'react';
import { motion } from 'framer-motion';
import { useResumeData } from '../../hooks/useResumeData';
import ResumePreview from './ResumePreview';
import { jsPDF } from 'jspdf';

const Resume: React.FC = () => {
  const { resume, isLoading, error, retry } = useResumeData();
  const [downloadStatus, setDownloadStatus] = useState<string>('');

  const generatePDF = () => {
    if (!resume) return;
    try {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text('Resume', 20, 20);
      doc.setFontSize(12);
      let yOffset = 30;

      doc.text('Experience', 20, yOffset);
      yOffset += 10;
      resume.experience.forEach(exp => {
        doc.text(`${exp.title} at ${exp.company}`, 20, yOffset);
        doc.text(
          `${exp.startDate} - ${exp.endDate || 'Present'}`,
          20,
          yOffset + 5
        );
        doc.text(exp.description, 20, yOffset + 10, { maxWidth: 160 });
        yOffset += 30 + Math.ceil(exp.description.length / 80) * 5;
      });

      doc.text('Education', 20, yOffset);
      yOffset += 10;
      resume.education.forEach(edu => {
        doc.text(`${edu.degree}, ${edu.institution}`, 20, yOffset);
        doc.text(`${edu.startDate} - ${edu.endDate}`, 20, yOffset + 5);
        yOffset += 15;
      });

      doc.text('Skills', 20, yOffset);
      yOffset += 10;
      doc.text(resume.skills.join(', '), 20, yOffset, { maxWidth: 160 });
      yOffset += 10 + Math.ceil(resume.skills.join(', ').length / 80) * 5;

      doc.text('Contact', 20, yOffset);
      yOffset += 10;
      doc.text(`Email: ${resume.contact.email}`, 20, yOffset);
      doc.text(`LinkedIn: ${resume.contact.linkedin}`, 20, yOffset + 5);

      doc.save('jpetrucci49-resume.pdf');
      setDownloadStatus('Resume downloaded successfully!');
      setTimeout(() => setDownloadStatus(''), 3000);
    } catch (err) {
      if (err instanceof Error) {
        setDownloadStatus(`Failed to generate PDF: ${err.message}`);
      }
    }
  };

  return (
    <div className="space-y-8 mt-10 px-4">
      <h2
        className="text-3xl font-semibold text-[--color-primary] text-center"
        id="resume-heading"
      >
        My Resume
      </h2>
      <div className="flex justify-center">
        <motion.button
          onClick={generatePDF}
          className="px-6 py-2 rounded-md text-white font-semibold bg-blue-700 border border-blue-800 shadow-md hover:bg-blue-800 hover:shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Download resume as PDF"
          disabled={isLoading || !!error || !resume}
          whileTap={{ scale: 0.95 }}
        >
          Download PDF
        </motion.button>
      </div>
      {downloadStatus && (
        <p className="text-green-600 text-center text-sm" aria-live="polite">
          {downloadStatus}
        </p>
      )}
      <div aria-busy={isLoading} aria-live="polite">
        {error ? (
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={retry}
              className="px-6 py-2 rounded-md text-white font-semibold bg-[--color-primary] shadow-sm hover:bg-blue-600 hover:shadow-md hover:scale-105 transition-all"
              aria-label="Retry loading resume"
            >
              Retry
            </button>
          </div>
        ) : resume ? (
          <ResumePreview resume={resume} />
        ) : isLoading ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {[1, 2, 3].map(index => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 animate-pulse"
              >
                <div className="h-6 w-1/4 bg-gray-200 rounded mb-4" />
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No resume data available.</p>
        )}
      </div>
    </div>
  );
};

export default Resume;
