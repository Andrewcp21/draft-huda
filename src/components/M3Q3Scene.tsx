import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './M3Q3Scene.module.css';

interface M3Q3SceneProps {
  userName: string;
  onBack: () => void;
  onNext: (feedback: string | null) => void;
}

const M3Q3Scene: React.FC<M3Q3SceneProps> = ({ userName, onBack, onNext }) => {
  const [feedback, setFeedback] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const maxLength = 150;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    onNext(feedback);
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-[#FFDE3D] pt-20">
      <div className={`${styles.notificationBar} ${isVisible ? styles.slideInM3Q3 : ''} w-full bg-red-600 text-white p-4 fixed top-0 left-0 right-0 z-20`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full flex-shrink-0">
              <span className="text-2xl">💟</span>
            </div>
            <p className="text-sm font-medium flex-1 text-left">
              Bebaskan idemu, sampaikan saja apa yang menurutmu menarik dari Digital Marketing.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto text-center relative z-10 px-4 pt-4">
        <div className="rounded-2xl p-4 mb-4">
          <h1 className="text-2xl font-bold mb-4">Selamat!</h1>
          
          <div className="relative w-full h-64 mb-4 rounded-xl overflow-hidden">
            <Image
              src="/GIF/ezgif.com-animated-gif-maker-14.gif"
              alt="Celebration Animation"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <p className="text-gray-700 text-lg mb-4">
            Kamu sudah menyelesaikan semua misi kamu hari ini! Tapi sebelum kamu pergi, bolehkah kami tau kenapa kamu tertarik belajar Digital Marketing?
          </p>
          
          <div className="mb-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              maxLength={maxLength}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              rows={4}
              placeholder="Tulis jawabanmu di sini (maks. 150 karakter)"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {feedback.length}/{maxLength} karakter
            </div>
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
            onClick={() => {
              console.log('Next button clicked in M3Q3Scene');
              handleNext();
            }}
            disabled={!feedback.trim()}
            className={`flex-1 h-12 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 ${feedback.trim() ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-400 cursor-not-allowed'}`}>
            Selanjutnya
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default M3Q3Scene;
