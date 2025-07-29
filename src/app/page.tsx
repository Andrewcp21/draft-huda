'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import WelcomeScene from '@/components/WelcomeScene';
import RegistrationScene from '@/components/RegistrationScene';
import ChatScene from '@/components/ChatScene';
import MeetingCoverScene from '@/components/MeetingCoverScene';
import M1Q1Scene from '@/components/M1Q1Scene';
import M1Q2Scene from '@/components/M1Q2Scene';
import M1Q3Scene from '@/components/M1Q3Scene';
import MeetingTransitionPopup from '@/components/MeetingTransitionPopup';
import Meeting2CoverScene from '@/components/Meeting2CoverScene';
import M2Q1Scene from '@/components/M2Q1Scene';
import M2Q2Scene from '@/components/M2Q2Scene';
import M2Q3Scene from '@/components/M2Q3Scene';
import M2Q4Scene from '@/components/M2Q4Scene';
import M2Q5Scene from '@/components/M2Q5Scene';
import M2Q6Scene from '@/components/M2Q6Scene';

export default function Home() {
  const searchParams = useSearchParams();
  const [currentScene, setCurrentScene] = useState('welcome');
  const [userData, setUserData] = useState({ name: '', email: '' });

  // Log scene changes for debugging
  useEffect(() => {
    console.log(`Scene changed to: ${currentScene}`);
  }, [currentScene]);

  // Handle URL parameters on initial load
  useEffect(() => {
    const scene = searchParams.get('scene');
    const name = searchParams.get('name');
    
    if (scene === 'meeting-cover') {
      setCurrentScene('meeting-cover');
      if (name) {
        setUserData(prev => ({ ...prev, name: decodeURIComponent(name) }));
      }
    }
  }, [searchParams]);

  const handleWelcomeNext = () => {
    setCurrentScene('registration');
  };

  const handleRegistrationBack = () => {
    setCurrentScene('welcome');
  };

  const handleRegistrationSuccess = (formData: { name: string; email: string }) => {
    setUserData(formData);
    setCurrentScene('chat');
  };

  const handleChatBack = () => {
    setCurrentScene('registration');
  };

  const handleMeetingCoverBack = () => {
    setCurrentScene('chat');
  };

  const handleMeetingCoverNext = () => {
    setCurrentScene('m1q1');
  };

  const handleM1Q1Back = () => {
    setCurrentScene('meeting-cover');
  };

  const handleM1Q1Next = (selectedOption: string | null) => {
    console.log('Selected option:', selectedOption);
    setCurrentScene('m1q2');
  };

  const handleM1Q2Back = () => {
    setCurrentScene('m1q1');
  };

  const handleM1Q2Next = (selectedOption: string | null) => {
    console.log('Selected option M1Q2:', selectedOption);
    setCurrentScene('m1q3');
  };

  const handleM1Q3Back = () => {
    setCurrentScene('m1q2');
  };

  const handleM1Q3Next = () => {
    setCurrentScene('meeting-transition');
  };

  const handleMeetingTransitionNext = () => {
    setCurrentScene('meeting2-cover');
  };

  const handleMeeting2CoverBack = () => {
    setCurrentScene('m1q3');
  };

  const handleMeeting2CoverNext = () => {
    setCurrentScene('m2q1');
  };

  const handleM2Q1Back = () => {
    setCurrentScene('meeting2-cover');
  };

  const handleM2Q1Next = () => {
    setCurrentScene('m2q2');
  };

  const handleM2Q2Back = () => {
    setCurrentScene('m2q1');
  };

  const handleM2Q2Next = () => {
    setCurrentScene('m2q3');
  };

  const handleM2Q3Back = () => {
    setCurrentScene('m2q2');
  };

  const handleM2Q3Next = (selectedOption: string | null) => {
    setCurrentScene('m2q4');
  };

  const handleM2Q4Back = () => {
    setCurrentScene('m2q3');
  };

  const handleM2Q4Next = (selectedOption: string | null) => {
    console.log('M2Q4 - Next button clicked, selected option:', selectedOption);
    console.log('Navigating to M2Q5');
    setCurrentScene('m2q5');
  };

  const handleM2Q5Back = () => {
    console.log('M2Q5 - Back button clicked');
    console.log('Navigating back to M2Q4');
    setCurrentScene('m2q4');
  };

  const handleM2Q5Next = () => {
    console.log('M2Q5 - Next button clicked');
    console.log('Navigating to M2Q6');
    setCurrentScene('m2q6');
  };

  const handleM2Q6Back = () => {
    console.log('M2Q6 - Back button clicked');
    console.log('Navigating back to M2Q5');
    setCurrentScene('m2q5');
  };

  const handleM2Q6Next = () => {
    console.log('M2Q6 - Next button clicked');
    console.log('All questions completed');
    // You can add completion logic here if needed
  };

  return (
    <main>
      {currentScene === 'welcome' && <WelcomeScene onNext={handleWelcomeNext} />}
      {currentScene === 'registration' && (
        <RegistrationScene 
          onBack={handleRegistrationBack} 
          onRegisterSuccess={() => handleRegistrationSuccess(userData)} 
        />
      )}
      {currentScene === 'chat' && (
        <ChatScene 
          userData={userData}
          onBack={handleChatBack}
          onNext={() => setCurrentScene('meeting-cover')}
        />
      )}
      {currentScene === 'meeting-cover' && (
        <MeetingCoverScene
          userName={userData.name}
          onBack={handleMeetingCoverBack}
          onNext={handleMeetingCoverNext}
        />
      )}
      {currentScene === 'm1q1' && (
        <M1Q1Scene
          userName={userData.name}
          onBack={handleM1Q1Back}
          onNext={handleM1Q1Next}
        />
      )}
      {currentScene === 'm1q2' && (
        <M1Q2Scene
          userName={userData.name}
          onBack={handleM1Q2Back}
          onNext={handleM1Q2Next}
        />
      )}
      {currentScene === 'm1q3' && (
        <M1Q3Scene 
          userName={userData.name}
          onBack={handleM1Q3Back}
          onNext={handleM1Q3Next}
        />
      )}
      {currentScene === 'meeting-transition' && (
        <MeetingTransitionPopup
          userName={userData.name}
          onNext={handleMeetingTransitionNext}
        />
      )}
      {currentScene === 'meeting2-cover' && (
        <Meeting2CoverScene
          userName={userData.name}
          onBack={handleMeeting2CoverBack}
          onNext={handleMeeting2CoverNext}
        />
      )}
      {currentScene === 'm2q1' && (
        <M2Q1Scene
          userName={userData.name}
          onBack={handleM2Q1Back}
          onNext={handleM2Q1Next}
        />
      )}
      {currentScene === 'm2q2' && (
        <M2Q2Scene
          userName={userData.name}
          onBack={handleM2Q2Back}
          onNext={handleM2Q2Next}
        />
      )}
      {currentScene === 'm2q3' && (
        <M2Q3Scene
          userName={userData.name}
          onBack={handleM2Q3Back}
          onNext={handleM2Q3Next}
        />
      )}
      {currentScene === 'm2q4' && (
        <M2Q4Scene
          userName={userData.name}
          onBack={handleM2Q4Back}
          onNext={handleM2Q4Next}
        />
      )}
      {currentScene === 'm2q5' && (
        <M2Q5Scene
          userName={userData.name}
          onBack={handleM2Q5Back}
          onNext={handleM2Q5Next}
        />
      )}
      {currentScene === 'm2q6' && (
        <M2Q6Scene
          userName={userData.name}
          onBack={handleM2Q6Back}
          onNext={handleM2Q6Next}
        />
      )}
    </main>
  );
}
