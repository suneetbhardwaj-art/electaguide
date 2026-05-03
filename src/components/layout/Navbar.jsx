import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { selectedCountry } = useAppContext();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClass = (path) => {
    return `transition-colors px-3 py-2 rounded-md text-sm font-medium block md:inline-block ${
      location.pathname === path ? 'bg-white text-deepBlue' : 'hover:bg-blue-800 text-white'
    }`;
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-deepBlue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-4">
            <Link to="/" className="font-bold text-xl flex items-center gap-2" onClick={closeMenu}>
              <span className="text-2xl">🗳️</span> ElectaGuide
            </Link>
            {selectedCountry && (
              <span className="bg-blue-100 text-deepBlue text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">
                {selectedCountry}
              </span>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-2">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/timeline" className={getLinkClass('/timeline')}>Timeline</Link>
            <Link to="/mythbuster" className={getLinkClass('/mythbuster')}>MythBuster</Link>
            <Link to="/quiz" className={getLinkClass('/quiz')}>Quiz</Link>
            <Link to="/chat" className={getLinkClass('/chat')}>AI Chat</Link>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-deepBlue border-t border-blue-800 px-4 pt-2 pb-4 space-y-1 shadow-inner">
          <Link to="/" onClick={closeMenu} className={getLinkClass('/')}>Home</Link>
          <Link to="/timeline" onClick={closeMenu} className={getLinkClass('/timeline')}>Timeline</Link>
          <Link to="/mythbuster" onClick={closeMenu} className={getLinkClass('/mythbuster')}>MythBuster</Link>
          <Link to="/quiz" onClick={closeMenu} className={getLinkClass('/quiz')}>Quiz</Link>
          <Link to="/chat" onClick={closeMenu} className={getLinkClass('/chat')}>AI Chat</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
