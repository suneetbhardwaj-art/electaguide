import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import timelineData from '../data/timelines.json';

const Timeline = () => {
  const { selectedCountry, mode } = useAppContext();
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [maxOpenedIndex, setMaxOpenedIndex] = useState(0);

  useEffect(() => {
    if (!selectedCountry) {
      navigate('/', { state: { message: "Please select a country first to begin your journey!" } });
    }
  }, [selectedCountry, navigate]);

  if (!selectedCountry) return null;

  const steps = timelineData[selectedCountry] || [];

  const handleStepClick = (index) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
    if (index > maxOpenedIndex) {
      setMaxOpenedIndex(index);
    }
  };

  const progressPercentage = steps.length > 0 ? ((maxOpenedIndex + 1) / steps.length) * 100 : 0;

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-deepBlue mb-2">
          Election Timeline: {selectedCountry}
        </h1>
        <p className="text-slate-600">Follow the steps to understand how the process works.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
          <span>Start</span>
          <span>Finish</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-4 border-blue-100 ml-4 md:ml-8 mb-12 space-y-8">
        {steps.map((step, index) => {
          const isExpanded = expandedIndex === index;
          const isPast = index <= maxOpenedIndex;

          return (
            <div key={index} className="relative pl-8 md:pl-12">
              {/* Timeline dot */}
              <div
                className={`absolute -left-[22px] w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md transition-colors duration-300 ${
                  isExpanded ? 'bg-blue-600 ring-4 ring-blue-100' : isPast ? 'bg-blue-400' : 'bg-slate-200'
                }`}
                onClick={() => handleStepClick(index)}
              >
                <span className={isExpanded ? 'text-white' : 'grayscale'}>{step.emoji}</span>
              </div>

              {/* Content Card */}
              <div
                className={`bg-white rounded-xl shadow-sm border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isExpanded ? 'border-blue-300 ring-1 ring-blue-100' : 'border-slate-200 hover:border-blue-200'
                }`}
                onClick={() => handleStepClick(index)}
              >
                <div className="p-5 flex justify-between items-center bg-slate-50">
                  <div>
                    <h3 className={`text-lg font-bold ${isExpanded ? 'text-blue-700' : 'text-slate-800'}`}>
                      {index + 1}. {step.title}
                    </h3>
                    <span className="inline-block mt-1 text-xs font-semibold px-2 py-1 bg-slate-200 text-slate-600 rounded">
                      ⏱️ {step.timeframe}
                    </span>
                  </div>
                  <span className={`transform transition-transform text-slate-400 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>

                {/* Expanded Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-96 opacity-100 p-5 border-t border-slate-100' : 'max-h-0 opacity-0 px-5 overflow-hidden'
                  }`}
                >
                  <p className="text-slate-700 leading-relaxed">
                    {mode === 'Beginner' ? step.beginner : step.advanced}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/mythbuster')}
          className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:scale-105 flex items-center gap-2"
        >
          Explore Myths →
        </button>
      </div>
    </div>
  );
};

export default Timeline;
