import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface M3Q1SceneProps {
  userName: string;
  onBack: () => void;
  onNext: () => void;
}

const M3Q1Scene: React.FC<M3Q1SceneProps> = ({ userName, onBack, onNext }) => {
  // Array of speech bubble texts with markdown-style bold formatting
  const speechBubbles = [
    "Nah, jadi minggu depan kami mau membuat **Festival Mekar & Kopi Musim Semi** nih.",
    "Tujuannya untuk terus meningkatkan pengunjung ke toko kami terutama anak-anak muda. Disana nanti mereka bisa menikmati kopi di tengah taman bunga.",
    "Akan ada festival musik juga yang dihadiri beberapa musisi lokal favorit. Kami juga akan mengadakan undian berhadiah yang bisa pengunjung menangkan."
  ];

  // State to track visible bubbles
  const [visibleBubblesCount, setVisibleBubblesCount] = useState(0);
  
  // Auto-show bubbles with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (visibleBubblesCount < speechBubbles.length) {
        setVisibleBubblesCount(prev => prev + 1);
      }
    }, 1500); // 1.5 second delay between bubbles
    
    return () => clearTimeout(timer);
  }, [visibleBubblesCount, speechBubbles.length]);

  // Handle next button click
  const handleNext = () => {
    if (visibleBubblesCount < speechBubbles.length) {
      setVisibleBubblesCount(prev => prev + 1);
    } else {
      onNext();
    }
  };

  // Handle back button click
  const handleBack = () => {
    if (visibleBubblesCount > 1) {
      setVisibleBubblesCount(prev => prev - 1);
    } else {
      onBack();
    }
  };

  // Helper function to render text with bold formatting
  const renderTextWithBold = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFDE3D] relative overflow-hidden">
      {/* Yellow background shape */}
      {/* Yellow background */}
      <div className="absolute inset-0 bg-[#FFDE3D] -z-10" />
      
      {/* White shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-3xl -z-5" />
      
      {/* Content container */}
      <div className="flex-grow flex flex-col p-6 pt-16">
        {/* Logo */}
        <div className="mb-8">
          <Image 
            src="/logorevou.png" 
            alt="RevoU Logo" 
            width={60} 
            height={60}
            className="mx-auto"
            priority
          />
        </div>

        {/* Speech bubbles container */}
        <div className="w-full max-w-md mx-auto space-y-4 mb-8">
          {speechBubbles.map((text, index) => (
            <div
              key={index}
              className={`
                bg-white p-4 rounded-xl shadow-md relative
                transition-all duration-300 ease-in-out
                ${index < visibleBubblesCount ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 h-0 overflow-hidden'}
                transition-delay: ${index * 0.2}s;
                ${index === 0 ? 'mt-0' : 'mt-4'}
              `}
            >
              <p className="text-gray-800 text-base leading-relaxed">
                {renderTextWithBold(text)}
              </p>
              {/* Speech bubble tail */}
              <div
                className="absolute -bottom-2 left-6 w-4 h-4 bg-white transform rotate-45"
                style={{
                  boxShadow: '2px 2px 2px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Character illustration */}
        <div className="flex-grow flex items-end justify-center">
          <div className="relative w-full max-w-xs">
            <Image
              src="/GIF/ezgif.com-animated-gif-maker-6.gif"
              alt="Character speaking"
              width={320}
              height={320}
              className="mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="flex flex-row gap-4 w-full max-w-md mx-auto">
          <button 
            onClick={handleBack}
            className="h-12 w-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center flex-none"
            aria-label="Kembali"
          >
            <FaArrowLeft className="text-white w-4 h-4" />
          </button>
          <button 
            onClick={handleNext}
            disabled={visibleBubblesCount < speechBubbles.length}
            className={`flex-1 h-12 font-semibold rounded-lg transition duration-200 flex items-center justify-center
              ${visibleBubblesCount < speechBubbles.length 
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 text-white'}`}
            aria-label={visibleBubblesCount < speechBubbles.length ? 'Tunggu hingga semua pesan selesai' : 'Lanjut'}
          >
            {visibleBubblesCount < speechBubbles.length ? 'Mengetik...' : 'Lanjut'}
            {visibleBubblesCount >= speechBubbles.length && <FaArrowRight className="ml-2 w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default M3Q1Scene;
