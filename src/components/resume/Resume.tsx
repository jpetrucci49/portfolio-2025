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
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Colors and fonts
      const primaryColor: [number, number, number] = [30, 64, 175]; // RGB for blue-700
      doc.setDrawColor(...primaryColor);
      doc.setFont('times', 'normal');
      const pageWidth = doc.internal.pageSize.getWidth();
      const leftColumnX = 20;
      const rightColumnX = 110;
      const margin = 20;
      let leftYOffset = 20;
      let rightYOffset = 20;

      // Header: Name and Contact
      doc.setFontSize(20);
      doc.setFont('times', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Joseph Petrucci', pageWidth / 2, leftYOffset, {
        align: 'center',
      });
      leftYOffset += 8;
      doc.setFontSize(10);
      doc.setFont('times', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(resume.contact.email, pageWidth / 2, leftYOffset, {
        align: 'center',
      });
      leftYOffset += 5;
      doc.text(resume.contact.linkedin, pageWidth / 2, leftYOffset, {
        align: 'center',
      });
      leftYOffset += 5;
      doc.line(margin, leftYOffset, pageWidth - margin, leftYOffset); // Header line
      leftYOffset += 7;
      rightYOffset = leftYOffset; // Align right column with left

      // Left Column: Professional Coding Experience, Education
      doc.setFontSize(14);
      doc.setFont('times', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Professional Dev Experience', leftColumnX, leftYOffset);

      leftYOffset += 3.5;
      doc.line(leftColumnX, leftYOffset, leftColumnX + 80, leftYOffset);
      leftYOffset += 5;

      doc.setFontSize(10);
      doc.setFont('times', 'normal');
      doc.setTextColor(0, 0, 0);
      resume.experience.forEach(exp => {
        doc.setFont('times', 'bold');
        doc.text(`${exp.title} at ${exp.company}`, leftColumnX, leftYOffset);
        leftYOffset += 4;
        doc.setFont('times', 'italic');
        doc.text(
          `${exp.startDate} - ${exp.endDate || 'Present'}`,
          leftColumnX,
          leftYOffset
        );
        leftYOffset += 5;
        doc.setFont('times', 'normal');
        exp.description.forEach((desc: string) => {
          const descLines = doc.splitTextToSize(desc, 78); // Adjusted for indentation
          descLines.forEach((line: string, lineIdx: number) => {
            const xPos =
              lineIdx === 0 ? leftColumnX + 1.76 : leftColumnX + 3.76; // 5px indent for first line, 7px for wrapped
            const prefix = lineIdx === 0 ? `• ${line}` : line;
            doc.text(prefix, xPos, leftYOffset);
            leftYOffset += 4;
          });
        });
        leftYOffset += 3;
      });

      doc.line(leftColumnX, leftYOffset, leftColumnX + 80, leftYOffset);
      leftYOffset += 7;

      doc.setFontSize(14);
      doc.setFont('times', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Education', leftColumnX, leftYOffset);

      leftYOffset += 3.5;
      doc.line(leftColumnX, leftYOffset, leftColumnX + 80, leftYOffset);
      leftYOffset += 5;

      doc.setFontSize(10);
      doc.setFont('times', 'normal');
      doc.setTextColor(0, 0, 0);
      resume.education.forEach(edu => {
        doc.setFont('times', 'bold');
        doc.text(edu.degree, leftColumnX, leftYOffset);
        leftYOffset += 4;
        doc.setFont('times', 'italic');
        doc.text(
          `${edu.institution}, ${edu.startDate} - ${edu.endDate}`,
          leftColumnX,
          leftYOffset
        );
        leftYOffset += 6;
      });

      // Right Column: Skills, Certifications, Contact, Projects
      doc.setFontSize(14);
      doc.setFont('times', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Skills', rightColumnX, rightYOffset);

      rightYOffset += 3.5;
      doc.line(rightColumnX, rightYOffset, rightColumnX + 80, rightYOffset);
      rightYOffset += 5;

      doc.setFontSize(10);
      doc.setFont('times', 'normal');
      doc.setTextColor(0, 0, 0);
      const skills = resume.skills;
      const colWidth = 25; // 75mm total width for 3 columns
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 3; col++) {
          const skillIndex = row * 3 + col;
          if (skillIndex < skills.length) {
            const xPos = rightColumnX + col * colWidth;
            doc.text(skills[skillIndex], xPos, rightYOffset);
          }
        }
        rightYOffset += 5;
      }

      rightYOffset += 2;
      doc.line(rightColumnX, rightYOffset, rightColumnX + 80, rightYOffset);
      rightYOffset += 7;

      doc.setFontSize(14);
      doc.setFont('times', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Contact', rightColumnX, rightYOffset);

      rightYOffset += 3.5;
      doc.line(rightColumnX, rightYOffset, rightColumnX + 80, rightYOffset);
      rightYOffset += 5;

      doc.setFontSize(10);
      doc.setFont('times', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`Email: ${resume.contact.email}`, rightColumnX, rightYOffset);
      rightYOffset += 4;
      doc.text(
        `LinkedIn: ${resume.contact.linkedin}`,
        rightColumnX,
        rightYOffset
      );

      rightYOffset += 7;
      doc.line(rightColumnX, rightYOffset, rightColumnX + 80, rightYOffset);
      rightYOffset += 7;

      doc.setFontSize(14);
      doc.setFont('times', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Projects', rightColumnX, rightYOffset);

      rightYOffset += 3.5;
      doc.line(rightColumnX, rightYOffset, rightColumnX + 80, rightYOffset);
      rightYOffset += 5;

      doc.setFontSize(10);
      doc.setFont('times', 'normal');
      doc.setTextColor(0, 0, 0);
      resume.projects?.forEach(project => {
        doc.setFont('times', 'bold');
        doc.text(project.title, rightColumnX, rightYOffset);
        rightYOffset += 4;
        const descLines = doc.splitTextToSize(project.description, 80);
        descLines.forEach((line: string, lineIdx: number) => {
          const xPos = lineIdx === 0 ? rightColumnX : rightColumnX + 2;
          const prefix = lineIdx === 0 ? `• ${line}` : line;
          doc.text(prefix, xPos, rightYOffset);
          rightYOffset += 4;
        });
        doc.setFont('times', 'italic');
        doc.text(project.date, rightColumnX, rightYOffset);
        rightYOffset += 6;
      });

      doc.save('joseph-petrucci-resume.pdf');
      setDownloadStatus('Resume downloaded successfully!');
      setTimeout(() => setDownloadStatus(''), 3000);
    } catch (err) {
      setDownloadStatus(`Failed to generate PDF: ${(err as Error).message}`);
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
              className="px-6 py-2 rounded-md text-white font-semibold bg-blue-700 border border-blue-800 shadow-md hover:bg-blue-800 hover:shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
