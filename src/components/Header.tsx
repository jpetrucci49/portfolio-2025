import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const isActiveCB = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-[--color-primary] font-semibold underline'
      : 'text-white hover:text-[--color-primary] hover:scale-105 transition-all duration-200';

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-10">
      <nav className="container flex flex-col md:flex-row justify-between items-center gap-4 py-4">
        <h1 className="text-2xl font-bold tracking-tight">Joseph Petrucci</h1>
        <ul className="flex flex-col md:flex-row list-none gap-6 md:gap-8">
          <li>
            <NavLink to="/" className={isActiveCB}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={isActiveCB}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" className={isActiveCB}>
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={isActiveCB}>
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
