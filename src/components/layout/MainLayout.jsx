import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-6 max-w-7xl">
        <Outlet />
      </main>
      <footer className="bg-slate-800 text-slate-300 py-6 text-center text-sm mt-auto">
        <p>
          Built with Google Antigravity by <a href="https://www.linkedin.com/in/suneet-bhardwaj-4a0060365/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-semibold">Suneet Bhardwaj</a> 🚀 | ElectaGuide — Civic Education for Everyone
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
