const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white text-center py-4">
      <p>
        &copy; {new Date().getFullYear()} Joseph Petrucci. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
