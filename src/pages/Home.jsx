import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const countries = [
  { name: 'India', flag: '🇮🇳', tagline: 'The world\'s largest democracy.' },
  { name: 'USA', flag: '🇺🇸', tagline: 'The Electoral College system.' },
  { name: 'UK', flag: '🇬🇧', tagline: 'First-Past-The-Post parliamentary system.' },
  { name: 'Australia', flag: '🇦🇺', tagline: 'Compulsory preferential voting.' },
  { name: 'Germany', flag: '🇩🇪', tagline: 'Mixed-member proportional representation.' },
];

const Home = () => {
  const { selectedCountry, setSelectedCountry, mode, setMode } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectMessage = location.state?.message;

  const handleStart = () => {
    if (selectedCountry) {
      navigate('/timeline');
    }
  };

  return (
    <div className="animate-fadeIn flex flex-col items-center py-12 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-deepBlue mb-4 tracking-tight">ElectaGuide 🗳️</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Your personal guide to understanding elections — simple, clear, and empowering.
        </p>
      </div>

      <div className="w-full mb-12">
        {redirectMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center font-medium shadow-sm animate-fadeIn">
            {redirectMessage}
          </div>
        )}
        <h2 className="text-2xl font-semibold text-deepBlue mb-6 text-center">Select a Country</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {countries.map((country) => (
            <div
              key={country.name}
              onClick={() => setSelectedCountry(country.name)}
              className={`cursor-pointer rounded-xl p-6 flex flex-col items-center text-center transition-all duration-200 border-2 ${
                selectedCountry === country.name
                  ? 'border-blue-600 bg-blue-50 shadow-md transform scale-105'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow'
              }`}
            >
              <span className="text-5xl mb-3">{country.flag}</span>
              <h3 className="font-bold text-lg text-slate-800 mb-2">{country.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{country.tagline}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm w-full max-w-md mb-8">
        <h2 className="text-lg font-semibold text-deepBlue mb-4">Select Learning Mode</h2>
        <div className="flex items-center space-x-4 bg-slate-100 p-2 rounded-lg">
          <button
            onClick={() => setMode('Beginner')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              mode === 'Beginner' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Beginner
          </button>
          <button
            onClick={() => setMode('Advanced')}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              mode === 'Advanced' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Advanced
          </button>
        </div>
        <p className="text-sm text-slate-500 mt-4 text-center">
          {mode === 'Beginner' 
            ? 'Simple analogies and straightforward explanations.' 
            : 'Detailed historical context and procedural facts.'}
        </p>
      </div>

      <button
        onClick={handleStart}
        disabled={!selectedCountry}
        className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-lg ${
          selectedCountry
            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl transform hover:scale-105'
            : 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-70'
        }`}
      >
        Start Your Journey →
      </button>
    </div>
  );
};

export default Home;
