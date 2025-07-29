import React, { useState } from 'react';
import Image from 'next/image';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import QuizResultPopup from './QuizResultPopup';

interface RegistrationSceneProps {
  onBack: () => void;
  onRegisterSuccess: () => void;
}

const RegistrationScene: React.FC<RegistrationSceneProps> = ({ onBack, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccessPopup(true);
  };

  const handleProceed = () => {
    setShowSuccessPopup(false);
    onRegisterSuccess(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-12 bg-[#FFDE3D] p-4 relative">
      {/* Remove the yellow shape since we're making the whole background yellow */}
      
      {/* Headline */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Kenalan dulu yuk!
      </h2>
      
      {/* Animated GIF */}
      <div className="w-full max-w-xs mx-auto mb-8">
        <Image
          src="/GIF/ezgif.com-animated-gif-maker-5.gif"
          alt="Registration"
          width={400}
          height={300}
          className="w-full h-auto"
          priority
        />
      </div>
      
      {/* Form Box */}
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
                placeholder="Nama lengkap"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email saat mendaftar di RevoU
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
                placeholder="contoh@email.com"
              />
            </div>
            
            <div className="flex flex-row items-center gap-4 pt-4 mb-4">
              <button
                type="button"
                onClick={onBack}
                className="p-3 text-gray-600 hover:text-gray-800 focus:outline-none rounded-full hover:bg-gray-100 flex-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center"
              >
                Lanjut <span className="ml-1">→</span>
              </button>
            </div>
          </form>
      </div>

      <QuizResultPopup isVisible={showSuccessPopup} onClose={handleProceed}>
        <div className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden border border-gray-200 shadow-xl">
          {/* Header */}
          <div className="bg-[#FFDE3D] p-4 flex justify-between items-center">
            <h3 className="text-lg font-bold">Yeay, berhasil!</h3>
            <button 
              onClick={handleProceed}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <FaCheckCircle className="text-green-500 w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold mb-2">Data kamu berhasil terkirim!</h3>
            <p className="text-gray-600 mb-6">
              Terima kasih sudah mengisi data diri. Sekarang kamu bisa melanjutkan ke tahap selanjutnya.
            </p>
            
            <button
              onClick={handleProceed}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Lanjut
            </button>
          </div>
        </div>
      </QuizResultPopup>
    </div>
  );
};

export default RegistrationScene;
