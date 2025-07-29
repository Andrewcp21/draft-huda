import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './M1Q1Scene.module.css';
import QuizResultPopup from './QuizResultPopup';

interface M1Q1SceneProps {
  userName: string;
  onBack: () => void;
  onNext: (selectedOption: string | null) => void;
}

const M1Q1Scene: React.FC<M1Q1SceneProps> = ({ userName, onBack, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showPopup, setShowPopup] = useState<'none' | 'correct' | 'wrong'>('none');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Trigger the slide-in animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = (optionId: string) => {
    if (isSubmitting) return;
    
    setSelectedOption(optionId);
    setIsSubmitting(true);
    
    if (optionId === 'instagram') {
      setShowPopup('correct');
    } else {
      setShowPopup('wrong');
      // Auto-hide wrong answer popup after 2 seconds
      setTimeout(() => {
        setShowPopup('none');
        setIsSubmitting(false);
        setSelectedOption(null);
      }, 2000);
    }
  };

  const handleNext = () => {
    if (selectedOption === 'instagram') {
      onNext(selectedOption);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-[#FFDE3D] pt-20">
      {/* Animated notification bar */}
      <div className={`${styles.notificationBar} ${isVisible ? styles.slideIn : ''} w-full bg-red-600 text-white p-4 fixed top-0 left-0 right-0 z-20`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full flex-shrink-0">
              <span className="text-2xl">🖐️</span>
            </div>
            <p className="text-sm font-medium flex-1 text-left">
            Semangat! Jangan takut salah, selamat mengerjakan!
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto text-center relative z-10 px-4 pt-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <p className="text-gray-700 text-lg mb-6 text-center">
            Kami punya banyak foto dan video produk yang bagus-bagus nih di Kafe Kami.
          </p>

          {/* Single Image */}
          <div className="relative w-full h-64 mb-6 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/M1Q1/img13.png"
              alt="Cafe Products"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>

          <p className="text-gray-700 text-lg mb-6 text-center">
            Media Sosial mana sih yang paling cocok buat kami pamer foto dan video yang indah ini?
          </p>
          
          {/* Social Media Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { id: 'instagram', name: 'Instagram', logo: '/M1Q1/Instagram_icon.png' },
              { id: 'linkedin', name: 'LinkedIn', logo: '/M1Q1/LinkedIn_logo_initials.png' },
              { id: 'pinterest', name: 'Pinterest', logo: '/M1Q1/Pinterest-logo.png' },
              { id: 'x-twitter', name: 'X (Twitter)', logo: '/M1Q1/X_logo.png' }
            ].map((platform) => (
              <button
                key={platform.id}
                onClick={() => handleAnswer(platform.id)}
                disabled={isSubmitting}
                className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 ${
                  selectedOption === platform.id
                    ? platform.id === 'instagram'
                      ? 'ring-4 ring-green-500 bg-green-100 shadow-lg'
                      : 'ring-4 ring-red-500 bg-red-100 shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 shadow-md'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="relative w-16 h-16 mb-2">
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="text-sm font-semibold text-gray-800 text-center">
                  {platform.name}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex flex-row gap-4 w-full max-w-xs mx-auto mb-4">
          <button
            onClick={onBack}
            className="h-12 w-12 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-full transition duration-300 flex items-center justify-center flex-none shadow-md transform hover:scale-110"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedOption || selectedOption !== 'instagram'}
            className={`flex-1 h-12 text-white font-bold rounded-full transition duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105 ${
              selectedOption === 'instagram'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed opacity-70'
            }`}
          >
            Selanjutnya
            <FaArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <QuizResultPopup isVisible={showPopup !== 'none'} onClose={() => setShowPopup('none')}>
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl">
          {showPopup === 'correct' ? (
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <Image
                  src="/GIF/ezgif.com-animated-gif-maker-8.gif"
                  alt="Correct Answer Illustration"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Kerja Bagus!</h3>
              <p className="text-gray-600 mb-6">
                Tepat sekali! Instagram adalah tempat terbaik untuk menampilkan foto dan video.
              </p>
              <button
                onClick={handleNext}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full font-bold flex items-center justify-center gap-2 transition duration-300 transform hover:scale-105 shadow-lg"
              >
                Lanjut <FaArrowRight />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-red-500 font-bold text-lg mb-4">
                Oops, coba lagi ya!
              </p>
              <p className="text-gray-600">
                Sepertinya itu bukan jawaban yang paling tepat. Pikirkan platform mana yang fokus pada visual.
              </p>
            </div>
          )}
        </div>
      </QuizResultPopup>
    </div>
  );
};

export default M1Q1Scene;
