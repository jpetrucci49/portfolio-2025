import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useState } from 'react';

type FormData = { name: string; email: string; message: string };

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    fetch(import.meta.env.VITE_FORM_URI, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000); // Hide after 5s
      })
      .catch(() => {
        setError('Failed to send message. Please try again.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="container bg-white p-8 rounded-lg shadow-md my-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Contact
      </h2>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Get in touch for opportunities or questions:
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-6 max-w-lg mx-auto ${
          isSubmitting ? 'opacity-50 pointer-events-none' : ''
        }`}
        aria-busy={isSubmitting}
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            {...register('name', { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1">Name is required</span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              Valid email is required
            </span>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Message
          </label>
          <textarea
            {...register('message', { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
            rows={4}
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <span className="text-red-500 text-sm mt-1">
              Message is required
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center"
          role="alert"
          aria-live="polite"
        >
          Message sent successfully!
        </motion.div>
      )}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center"
          role="alert"
          aria-live="polite"
        >
          {error}
        </motion.div>
      )}
      <ul className="mt-6 space-y-2 list-none text-center">
        <li>
          <a
            href="mailto:Joseph.Petrucci49@gmail.com"
            className="text-[--color-primary] hover:underline"
          >
            Email: Joseph.Petrucci49@gmail.com
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/joseph-petrucci"
            className="text-[--color-primary] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://github.com/jpetrucci49"
            className="text-[--color-primary] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Contact;
