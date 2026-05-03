import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useAppContext } from '../context/AppContext';
import quizzesData from '../data/quizzes.json';

const Quiz = () => {
  const { selectedCountry } = useAppContext();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!selectedCountry) {
      navigate('/', { state: { message: "Please select a country first to begin your journey!" } });
    }
  }, [selectedCountry, navigate]);

  if (!selectedCountry) return null;

  const questions = quizzesData[selectedCountry] || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    
    setSelectedAnswer(option);
    if (option === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const getOptionStyles = (option) => {
    if (selectedAnswer === null) {
      return 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700';
    }
    if (option === currentQuestion.answer) {
      return 'bg-green-100 border-green-500 text-green-800 font-bold';
    }
    if (option === selectedAnswer && option !== currentQuestion.answer) {
      return 'bg-red-100 border-red-500 text-red-800';
    }
    return 'bg-white border-slate-200 text-slate-400 opacity-50'; // Unselected wrong options
  };

  if (showResults) {
    const isHighScorer = score >= 4;
    return (
      <div className="animate-fadeIn max-w-2xl mx-auto py-12 text-center">
        {isHighScorer && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100">
          <div className="text-6xl mb-6">🏆</div>
          <h1 className="text-4xl font-bold text-deepBlue mb-4">Quiz Complete!</h1>
          <p className="text-2xl font-semibold text-slate-700 mb-6">
            You scored {score} out of {questions.length}
          </p>
          <p className="text-slate-600 mb-10 leading-relaxed">
            {score === questions.length 
              ? "Perfect score! You're a true democratic scholar." 
              : score >= questions.length / 2 
                ? "Great job! You have a solid grasp of how elections work." 
                : "Good effort! Democracy is complicated, but learning is the first step."}
          </p>
          <button
            onClick={() => navigate('/chat')}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2 mx-auto"
          >
            <span>💬</span> Chat with ElectaGuide →
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="animate-fadeIn max-w-3xl mx-auto py-8">
      <div className="mb-8 flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-deepBlue">Civics Quiz</h1>
        <span className="bg-blue-100 text-blue-800 text-sm font-bold px-4 py-2 rounded-full">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-8 leading-snug">
          {currentQuestion.question}
        </h2>

        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-lg ${getOptionStyles(option)}`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer && (
          <div className="mt-8 animate-fadeIn">
            <div className={`p-5 rounded-xl border-l-4 ${selectedAnswer === currentQuestion.answer ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              <h3 className={`font-bold mb-2 flex items-center gap-2 ${selectedAnswer === currentQuestion.answer ? 'text-green-800' : 'text-red-800'}`}>
                {selectedAnswer === currentQuestion.answer ? '✅ Correct!' : '❌ Incorrect'}
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                className="bg-deepBlue text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-all shadow-md hover:scale-105 flex items-center gap-2"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'See Results →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
