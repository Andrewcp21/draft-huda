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
import Meeting2CoverScene from '@/components/Meeting2CoverScene';
import M2Q1Scene from '@/components/M2Q1Scene';
import M2Q2Scene from '@/components/M2Q2Scene';

export default function Home() {
  const searchParams = useSearchParams();
  const [currentScene, setCurrentScene] = useState('welcome');
  const [userData, setUserData] = useState({ name: '', email: '' });

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
    console.log('Proceeding from M2Q2');
    // Handle navigation to the next scene after M2Q2
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
    </main>
  );
}
