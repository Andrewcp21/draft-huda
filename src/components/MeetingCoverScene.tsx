import React from 'react';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

interface MeetingCoverSceneProps {
  userName: string;
  onBack: () => void;
  onNext: () => void;
}

const MeetingCoverScene: React.FC<MeetingCoverSceneProps> = ({ userName, onBack, onNext }) => {
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

        {/* Meeting Badge */}
        <div className="px-4 py-2 bg-[#FFDE3D] rounded-full inline-block mb-6">
          <span className="text-black text-lg font-bold">
            Meeting 1
          </span>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Familiarity with Digital Marketing
        </h1>
        
        {/* Animated GIF */}
        <div className="mb-8 max-w-xs mx-auto">
          <Image
            src="/GIF/ezgif.com-animated-gif-maker-13.gif"
            alt="Digital Marketing"
            width={320}
            height={320}
            className="mx-auto"
            priority
          />
        </div>
        
        {/* Greeting */}
        <p className="text-gray-600 text-lg mb-8">
          Halo! Terimakasih sudah hadir disini <span className="font-bold text-black">{userName}</span>!<br />
          Yuk kita mulai meeting-nya ya!
        </p>
        
        {/* Navigation Buttons */}
        <div className="flex flex-row gap-4 w-full max-w-xs mx-auto mb-4">
          <button 
            onClick={onBack}
            className="h-12 w-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center flex-none"
          >
            <FaArrowLeft className="text-white w-4 h-4" />
          </button>
          <button 
            onClick={onNext}
            className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingCoverScene;
