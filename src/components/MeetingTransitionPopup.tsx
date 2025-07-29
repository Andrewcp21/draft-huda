import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './MeetingTransitionPopup.module.css';

interface MeetingTransitionPopupProps {
  userName: string;
  onNext: () => void;
}

const MeetingTransitionPopup: React.FC<MeetingTransitionPopupProps> = ({ userName, onNext }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay for the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.popupOverlay} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.popupContent}>
        <div className={styles.popupImageContainer}>
          <Image
            src="/GIF/ezgif.com-animated-gif-maker-10.gif"
            alt="Thank You"
            width={200}
            height={200}
            className={styles.popupImage}
          />
        </div>
        
        <div className={styles.popupText}>
          Terimakasih {userName}! Hasil diskusi ini akan aku sampaikan ke tim. 
          Aku sudah invite kamu ke Meeting selanjutnya untuk menganalisa hasil iklani ini ya.
        </div>
        
        <button 
          className={styles.ctaButton}
          onClick={onNext}
        >
          Berangkat ke Meeting 2!
        </button>
      </div>
    </div>
  );
};

export default MeetingTransitionPopup;
