import React from 'react';
import Image from 'next/image';

interface WelcomeSceneProps {
  onNext: () => void;
}

const WelcomeScene: React.FC<WelcomeSceneProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white relative overflow-hidden">
      {/* Yellow background shape */}
      <div className="absolute inset-0 bg-[#FFDE3D] -z-10" style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
      }} />
      
      <div className="w-full max-w-md mx-auto text-center relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <Image 
            src="/logorevou.png" 
            alt="RevoU Logo" 
            width={80} 
            height={80}
            className="mx-auto"
          />
        </div>
        
        {/* Headline */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Selamat Datang, Calon Digital Marketer!
        </h1>
        
        {/* Animated GIF */}
        <div className="mb-8 max-w-xs mx-auto">
          <Image
            src="/GIF/ezgif.com-animated-gif-maker.gif"
            alt="Digital Marketing"
            width={320}
            height={320}
            className="mx-auto"
            priority
          />
        </div>
        
        {/* Subheadline */}
        <p className="text-gray-600 text-lg mb-8">
          Cari tahu tipe Digital Marketer seperti apakah kamu?
        </p>
        
        {/* CTA Button */}
        <button 
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 w-full max-w-xs mx-auto"
          onClick={onNext}
        >
          Mulai Sekarang
        </button>
      </div>
    </div>
  );
};

export default WelcomeScene;
