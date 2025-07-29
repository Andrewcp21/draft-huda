import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaHeart, FaComment } from 'react-icons/fa';
import styles from './M2Q6Scene.module.css';

interface M2Q6SceneProps {
  userName: string;
  onBack: () => void;
  onNext: (selectedOption: string | null) => void;
}

const M2Q6Scene: React.FC<M2Q6SceneProps> = ({ userName, onBack, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
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

  const options = [
    { id: 'A', imgSrc: '/img4.png', likes: 50, comments: 100 },
    { id: 'B', imgSrc: '/img5.png', likes: 100, comments: 200 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-[#FFDE3D] pt-20">
      <div className={`${styles.notificationBar} ${isVisible ? styles.slideInM2Q6 : ''} w-full bg-red-600 text-white p-4 fixed top-0 left-0 right-0 z-20`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <div className="bg-white p-2 rounded-full flex-shrink-0">
              <span className="text-2xl">🖐️</span>
            </div>
            <p className="text-sm font-medium flex-1 text-left">
              🙋‍♂️Sebentar lagi selesai loh! Disini kamu bisa pilih kata yang dicetak tebal untuk mendapatkan pentunjuk! 💟
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto text-center relative z-10 px-4 pt-4">
        <div className="rounded-2xl p-4 mb-4">
          <p className="text-gray-700 text-lg mb-4 text-left">
            Akun Instagram saya saat ini memiliki 1000 followers. Beberapa waktu lalu, tim saya pernah mem-posting 2 konten berikut dan memberikan data-nya ke saya. Konten mana yang memiliki <button onClick={() => setShowHint(true)} className="text-red-600 font-bold underline cursor-pointer">Engagement Rate</button> lebih baik?
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`p-2 rounded-xl text-left transition-all cursor-pointer ${selectedOption === option.id ? 'ring-2 ring-red-500 bg-red-100' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <div className="relative w-full h-48 mb-2 rounded-md overflow-hidden">
                  <Image
                    src={option.imgSrc}
                    alt={`Option ${option.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-around items-center text-gray-700">
                  <div className="flex items-center gap-1">
                    <FaHeart className="text-red-500" />
                    <span className="text-sm font-medium">{option.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaComment className="text-gray-500" />
                    <span className="text-sm font-medium">{option.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {showHint && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
              <p className="text-lg font-semibold mb-4">Engagement Rate = (Likes + Comments) ÷ Followers x 100%</p>
              <button 
                onClick={() => setShowHint(false)}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
              >
                Kembali
              </button>
            </div>
          </div>
        )}

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

export default M2Q6Scene;
