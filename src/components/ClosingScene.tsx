import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ClosingSceneProps {
  userName: string;
}

const ClosingScene: React.FC<ClosingSceneProps> = ({ userName }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white relative overflow-hidden">
      {/* Yellow background shape */}
      <div className="absolute inset-0 bg-[#FFDE3D] -z-10" style={{
        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
      }} />
      
      <div className="w-full max-w-md mx-auto text-center relative z-10">
        {/* Logo */}
        <div className="mb-6">
          <Image 
            src="/logorevou.png" 
            alt="RevoU Logo" 
            width={80} 
            height={80}
            className="mx-auto"
          />
        </div>
        
        {/* Thank you message with dynamic name */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Terima kasih, {userName}!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Kamu sudah menyelesaikan tantangan ini. Dari tantangan ini kamu adalah calon:
        </p>
        
        {/* Animated GIF */}
        <div className="mb-4 max-w-xs mx-auto">
          <Image
            src="/GIF/ezgif.com-animated-gif-maker-2.gif"
            alt="Data-Aware Marketer"
            width={280}
            height={280}
            className="mx-auto"
            priority
          />
          <p className="font-bold text-lg mt-2">Data-Aware Marketer</p>
        </div>
        
        {/* Question */}
        <p className="text-gray-700 text-lg mb-6">
          Apakah kamu tertarik menjadi<br />
          Digital Marketer?
        </p>
        
        {/* WhatsApp CTA Button */}
        <Link 
          href="https://wa.me/6283120911271" 
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 w-full max-w-xs mx-auto"
        >
          Hubungi Kami di WhatsApp
        </Link>
      </div>
    </div>
  );
};

export default ClosingScene;
