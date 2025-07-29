import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './MeetingTransitionPopup.module.css';

interface M2ToM3TransitionPopupProps {
  userName: string;
  onNext: () => void;
}

const M2ToM3TransitionPopup: React.FC<M2ToM3TransitionPopupProps> = ({ userName, onNext }) => {
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
            src="/GIF/ezgif.com-animated-gif-maker-8.gif"
            alt="Thank You"
            width={200}
            height={200}
            className={styles.popupImage}
          />
        </div>
        
        <div className={styles.popupText}>
          Wah, diskusi kita hari ini sangat mencerahkan! Sejauh ini saya sangat terbantu, terimakasih {userName}! Tapi kita masih punya 1 meeting lagi, sampai jumpa!
        </div>
        
        <button 
          className={styles.ctaButton}
          onClick={onNext}
        >
          Lanjut ke Meeting 3!
        </button>
      </div>
    </div>
  );
};

export default M2ToM3TransitionPopup;
