import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import mythsData from '../data/myths.json';

const FlipCard = ({ mythData, onFirstFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);

  const handleClick = () => {
    if (!hasFlipped) {
      setHasFlipped(true);
      onFirstFlip();
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="relative w-full h-80 sm:h-72 cursor-pointer" 
      onClick={handleClick}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of Card */}
        <div 
          className="absolute w-full h-full bg-white border-2 border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow hover:shadow-lg transition-shadow"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-5xl mb-6">🤔</div>
          <h3 className="text-xl font-bold text-slate-800 mb-4 px-2">{mythData.myth}</h3>
          <div className="mt-auto inline-flex items-center gap-2 text-blue-600 font-semibold bg-blue-50 px-4 py-2 rounded-full">
            <span>Tap to reveal</span>
          </div>
        </div>

        {/* Back of Card */}
        <div 
          className="absolute w-full h-full bg-slate-50 border-2 border-blue-200 rounded-2xl p-6 flex flex-col shadow-md overflow-y-auto"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="mb-4">
            <h3 className="font-bold text-green-700 text-lg mb-2 flex items-center gap-2">
              <span className="text-2xl">✅</span> Fact
            </h3>
            <p className="text-sm text-slate-800 font-medium leading-relaxed">
              {mythData.fact}
            </p>
          </div>
          <div className="mt-auto bg-white p-3 rounded-lg border border-slate-200">
            <h4 className="font-bold text-xs text-blue-800 uppercase tracking-widest mb-1">
              Historical Example
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {mythData.example}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MythBuster = () => {
  const navigate = useNavigate();
  const { selectedCountry } = useAppContext();
  const [bustedCount, setBustedCount] = useState(0);

  useEffect(() => {
    if (!selectedCountry) {
      navigate('/', { state: { message: "Please select a country first to begin your journey!" } });
    }
  }, [selectedCountry, navigate]);

  const handleFirstFlip = () => {
    setBustedCount(prev => prev + 1);
  };

  const myths = mythsData[selectedCountry] || mythsData["Universal"] || [];

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-deepBlue mb-4">Myth Buster</h1>
        <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 px-6 py-3 rounded-full">
          <span className="text-xl">🎯</span>
          <span className="font-semibold text-blue-800 text-lg">
            You've busted {bustedCount} of {myths.length} myths
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {myths.map((myth, index) => (
          <FlipCard 
            key={index} 
            mythData={myth} 
            onFirstFlip={handleFirstFlip} 
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/quiz')}
          className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:scale-105"
        >
          Test Your Knowledge →
        </button>
      </div>
    </div>
  );
};

export default MythBuster;
