import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './M1Q2Scene.module.css';
import QuizResultPopup from './QuizResultPopup';

interface M1Q2SceneProps {
  userName: string;
  onBack: () => void;
  onNext: (selectedOption: string | null) => void;
}

const M1Q2Scene: React.FC<M1Q2SceneProps> = ({ userName, onBack, onNext }) => {
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
    
    if (optionId === 'search-ads') {
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
    if (selectedOption === 'search-ads') {
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
            Pertanyaan selanjutnya dari Klien nih! Jawab dengan yang kamu tahu dulu. Tenang, ada bantuan kok. 😉
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto text-center relative z-10 px-4 pt-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <p className="text-gray-700 text-lg mb-6 text-left">
            Oke, mengerti. Lalu, gini nih, kalau ada pelanggan yang lagi cari 'kopi enak' atau 'bunga segar' di internet. Menurut Kamu, cara apa yang paling jitu biar kafe kami langsung mudah ditemukan di internet?
          </p>

          {/* Answer Options */}
          <div className="flex flex-col gap-4 mb-6">
            {[
              { id: 'social-media', text: 'Rajin posting foto dan video di Instagram atau Facebook.' },
              { id: 'email', text: 'Kirim info terbaru lewat email ke pelanggan.' },
              { id: 'influencer', text: 'Ajak selebriti internet (influencer) buat bikin konten.' },
              { id: 'search-ads', text: 'Pasang iklan khusus di mesin pencari (seperti Google Search Ads, biar muncul paling atas).' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                disabled={isSubmitting}
                className={`p-4 rounded-xl text-left transition-all w-full ${
                  selectedOption === option.id
                    ? option.id === 'search-ads'
                      ? 'ring-4 ring-green-500 bg-green-50'
                      : 'ring-4 ring-red-500 bg-red-50'
                    : 'bg-gray-100 hover:bg-gray-200'
                } ${isSubmitting ? 'opacity-70' : ''}`}
              >
                <span className="font-medium text-gray-800">
                  {option.text}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
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
            className={`flex-1 h-12 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 ${
              selectedOption 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Selanjutnya
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <QuizResultPopup isVisible={showPopup !== 'none'} onClose={() => setShowPopup('none')}>
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4">
          {showPopup === 'correct' ? (
            <div className="text-center">
              <img
                src="/GIF/ezgif.com-animated-gif-maker-8.gif"
                alt="Correct Answer Illustration"
                className="mx-auto mb-4"
                style={{ maxWidth: '100px', height: 'auto' }}
              />
              <p className="text-gray-700 mb-6">
                Tepat sekali! Google Search Ads adalah channel terbaik untuk memastikan brand kita tampil di hasil pencarian Google. Channel ini sering dipakai agar Brand berada di urutan pertama hasil pencarian dari kata / keyword yang disasar.
              </p>
              <button
                onClick={handleNext}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                Selanjutnya <FaArrowRight />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-700 text-lg mb-6">
                Jawaban salah! Coba Lagi ya! 😢
              </p>
            </div>
          )}
        </div>
      </QuizResultPopup>
    </div>
  );
};

export default M1Q2Scene;
