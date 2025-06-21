const Contact: React.FC = () => {
  return (
    <section className="container bg-white p-8 rounded-lg shadow-md my-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact</h2>
      <p className="text-lg text-gray-600 mb-4">
        Get in touch for opportunities or questions:
      </p>
      <ul className="space-y-2 list-none">
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
