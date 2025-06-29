import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaCodeBranch } from 'react-icons/fa';
import { useGitHubActivities } from '../../hooks/useGitHubActivities';

const RecentActivity: React.FC = () => {
  const { activities, isLoading, error, retry } = useGitHubActivities();

  return (
    <div className="space-y-8 mt-10">
      <h3
        className="text-2xl font-semibold text-[--color-primary] text-center"
        id="activity-heading"
      >
        Recent Activity
      </h3>
      {activities.length > 0 && (
        <p className="text-gray-600 text-center text-sm" aria-live="polite">
          Showing {activities.length} contributions
        </p>
      )}
      <div aria-busy={isLoading} aria-live="polite">
        {error ? (
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={retry}
              className="px-6 py-2 rounded-md text-white font-semibold bg-[--color-primary] shadow-sm hover:bg-blue-600 hover:shadow-md hover:scale-105 transition-all"
              aria-label="Retry loading contributions"
            >
              Retry
            </button>
          </div>
        ) : activities.length > 0 ? (
          <ul className="space-y-4" aria-labelledby="activity-heading">
            <AnimatePresence initial={false}>
              {activities.map((activity, index) => (
                <motion.li
                  key={activity.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeInOut',
                    delay: index * 0.1,
                  }}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md p-4 border border-gray-100 transition-shadow"
                  role="listitem"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 text-right">
                      <span className="text-lg font-bold text-[--color-primary] relative">
                        {activity.date}
                        <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-[--color-primary] to-blue-400" />
                      </span>
                    </div>
                    <div className="flex-1 border-l-2 border-gray-200 pl-6">
                      <div className="flex items-center gap-3">
                        <span className="inline-block p-2 bg-[--color-primary] text-white rounded-full">
                          {activity.type === 'Push' ? (
                            <FaCode size={16} aria-label="Commit icon" />
                          ) : (
                            <FaCodeBranch
                              size={16}
                              aria-label="Pull request icon"
                            />
                          )}
                        </span>
                        <div>
                          <p className="text-lg text-gray-700 font-medium">
                            {activity.description}
                          </p>
                          <a
                            href={`https://github.com/${activity.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[--color-primary] hover:underline text-sm font-semibold"
                            aria-label={`View ${activity.repo} on GitHub`}
                          >
                            View on GitHub
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : isLoading ? (
          <ul className="space-y-4" aria-label="Loading recent contributions">
            {[1, 2, 3].map(index => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 animate-pulse"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 text-right">
                    <div className="h-6 w-20 bg-gray-200 rounded" />
                  </div>
                  <div className="flex-1 border-l-2 border-gray-200 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-gray-200 rounded-full" />
                      <div className="flex-1">
                        <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-1/4 bg-gray-200 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">
            No contributions available. Check back for updates!
          </p>
        )}
      </div>
      <div className="text-center mt-6">
        <a
          href="https://github.com/jpetrucci49?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[--color-primary] hover:underline text-lg font-semibold"
          aria-label="View my GitHub repositories"
        >
          View My Repositories
        </a>
      </div>
    </div>
  );
};

export default RecentActivity;
