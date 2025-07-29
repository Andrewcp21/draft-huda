import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './M2Q4Scene.module.css';


interface M2Q4SceneProps {
  userName: string;
  onBack: () => void;
  onNext: (selectedOption: string | null) => void;
}

const M2Q4Scene: React.FC<M2Q4SceneProps> = ({ userName, onBack, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    onNext(selectedOption);
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-[#FFDE3D] pt-20">
      <div className={`${styles.notificationBar} ${isVisible ? styles.slideInM2Q4 : ''} w-full bg-red-600 text-white p-4 fixed top-0 left-0 right-0 z-20`}>
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
        <div className="rounded-2xl p-4 mb-4">
          <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden">
            <Image
              src="/table2.png"
              alt="Email Open Rate Data Table"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <p className="text-gray-700 text-lg mb-4">
            Saya juga punya data ini. Menurut kamu, kapan waktu paling tepat untuk mengirim email promosi?
          </p>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            {[
              { id: 'time-1', text: '09:00 - 11:00' },
              { id: 'time-2', text: '11:30 - 13:30' },
              { id: 'time-3', text: '16:00 - 19.00' },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`p-4 rounded-xl text-left transition-all ${selectedOption === option.id ? 'ring-2 ring-red-500 bg-red-100' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <span className="text-sm font-medium text-gray-800">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-row gap-4 w-full max-w-xs mx-auto mb-4">
          <button 
            onClick={onBack}
            className="h-12 w-12 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition duration-200 flex items-center justify-center flex-none"
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={handleNext}
            disabled={!selectedOption}
            className={`flex-1 h-12 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 ${selectedOption ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}>
            Selanjutnya
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>


    </div>
  );
};

export default M2Q4Scene;
