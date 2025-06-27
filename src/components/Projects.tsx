import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://api.github.com/users/jpetrucci49/repos', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then((data: GitHubRepo[]) => {
        setRepos(data.sort((a, b) => b.id - a.id)); // Sort by most recent
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching GitHub repos:', err);
        setRepos([]);
        setIsLoading(false);
      });
  }, []);

  const openModal = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRepo(null);
  };

  return (
    <section
      className="container bg-white p-8 rounded-lg shadow-md my-10"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="text-3xl font-bold text-gray-800 mb-6 text-center"
      >
        Projects
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center"
        role="alert"
        aria-label="Works in progress notice"
      >
        <p className="text-blue-700 font-medium">
          Published works are in progress. Stay tuned for modernized projects
          showcasing the latest technologies!
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-[--color-primary] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            role="status"
            aria-label="Loading repositories"
          />
        </div>
      ) : repos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map(repo => (
            <ProjectCard key={repo.id} repo={repo} openModal={openModal} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600" aria-live="polite">
          No repositories found. Check back soon for updates!
        </p>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-8 rounded-lg max-w-2xl mx-auto mt-20 outline-none"
        overlayClassName="fixed inset-0 bg-gray-800/30 backdrop-blur-sm flex items-center justify-center"
        aria={{
          labelledby: 'modal-heading',
          describedby: 'modal-description',
        }}
      >
        {selectedRepo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2
              id="modal-heading"
              className="text-2xl font-bold text-gray-800 mb-4"
            >
              {selectedRepo.name}
            </h2>
            <p id="modal-description" className="text-gray-600 mb-4">
              {selectedRepo.description || 'No description available.'}
            </p>
            <div className="flex flex-wrap gap-4 mb-4">
              <a
                href={selectedRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--color-primary] hover:underline"
                aria-label={`GitHub repository for ${selectedRepo.name}`}
              >
                GitHub
              </a>
              {selectedRepo.homepage && (
                <a
                  href={selectedRepo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--color-primary] hover:underline"
                  aria-label={`Live demo for ${selectedRepo.name}`}
                >
                  Live Demo
                </a>
              )}
            </div>
            <button
              onClick={closeModal}
              className="bg-[--color-primary] text-white px-4 py-2 rounded hover:bg-blue-700"
              aria-label="Close project details modal"
            >
              Close
            </button>
          </motion.div>
        )}
      </Modal>
    </section>
  );
};

const ProjectCard: React.FC<{
  repo: GitHubRepo;
  openModal: (repo: GitHubRepo) => void;
}> = ({ repo, openModal }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.03, boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
    className="border border-gray-200 rounded-lg p-6 bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer"
    onClick={() => openModal(repo)}
    role="button"
    tabIndex={0}
    onKeyDown={e => e.key === 'Enter' && openModal(repo)}
    aria-label={`View details for ${repo.name}`}
  >
    <h3 className="text-xl font-semibold text-[--color-primary] mb-2">
      {repo.name}
    </h3>
    <p className="text-gray-600 mb-4 line-clamp-3">
      {repo.description || 'No description available.'}
    </p>
    <div className="flex flex-wrap gap-4">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[--color-primary] hover:underline"
        aria-label={`GitHub repository for ${repo.name}`}
      >
        GitHub
      </a>
      {repo.homepage && (
        <a
          href={repo.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[--color-primary] hover:underline"
          aria-label={`Live demo for ${repo.name}`}
        >
          Live Demo
        </a>
      )}
    </div>
  </motion.div>
);

export default Projects;
