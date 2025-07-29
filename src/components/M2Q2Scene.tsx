"use client";
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './M2Q2Scene.module.css';

interface M2Q2SceneProps {
  userName: string;
  onBack: () => void;
  onNext: () => void;
}

const M2Q2Scene: React.FC<M2Q2SceneProps> = ({ userName, onBack, onNext }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNumberClick = (num: number | string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setCurrentValue(String(num));
      setWaitingForOperand(false);
    } else {
      if (num === '.' && currentValue.includes('.')) {
        return;
      }
      let newValue = currentValue === '0' && num !== '.' ? String(num) : currentValue + String(num);
      setDisplay(newValue);
      setCurrentValue(newValue);
    }
  };

  const performCalculation: { [key: string]: (prev: number, next: number) => number } = {
    '/': (prev, next) => prev / next,
    '*': (prev, next) => prev * next,
    '-': (prev, next) => prev - next,
    '+': (prev, next) => prev + next,
  };

  const handleOperatorClick = (nextOperator: string) => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator && !waitingForOperand) {
      const result = performCalculation[operator](previousValue, inputValue);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setCalculationHistory(`${previousValue === null ? inputValue : display} ${nextOperator}`);
    setWaitingForOperand(true);
    setOperator(nextOperator);
    setCurrentValue('');
  };

  const handleEqualsClick = () => {
    if (operator === null || currentValue === '') {
      return;
    }
    const inputValue = parseFloat(currentValue);
    if (previousValue !== null) {
        const result = performCalculation[operator](previousValue, inputValue);
        setDisplay(String(result));
        setCurrentValue(String(result));
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(false);
        setCalculationHistory('');
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setCurrentValue('');
    setOperator(null);
    setPreviousValue(null);
    setWaitingForOperand(false);
    setCalculationHistory('');
  };

  const handleToggleSignClick = () => {
    if (currentValue !== '' && currentValue !== '0') {
      const toggledValue = parseFloat(currentValue) * -1;
      setDisplay(String(toggledValue));
      setCurrentValue(String(toggledValue));
    } else if (display !== '0') {
      const toggledValue = parseFloat(display) * -1;
      setDisplay(String(toggledValue));
      setCurrentValue(String(toggledValue)); 
    }
  };

  const handlePercentageClick = () => {
    const value = parseFloat(currentValue || display);
    const result = value / 100;
    setDisplay(String(result));
    setCurrentValue(String(result));
  };

  const handleBackspaceClick = () => {
    if (display.length === 1 || display === '0') {
      setDisplay('0');
      setCurrentValue('');
    } else {
      setDisplay(display.slice(0, -1));
      setCurrentValue(currentValue.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-[#FFDE3D] pt-30">
      <div className={`${styles.notificationBar} ${isVisible ? styles.slideIn : ''} w-full bg-red-600 text-white p-4 fixed top-0 left-0 right-0 z-20`}>
        <div className="max-w-md mx-auto">
          <p className="text-sm font-bold">
            😉Ada pertanyaan lagi nih dari klien. Kamu pasti bisa menjawabnya.
          </p>
        </div>
      </div>

      <div className={`flex-grow flex flex-col items-center justify-center w-full`}>
        <div className="text-center mb-4 max-w-sm mx-auto px-4">
          <p className="text-md text-gray-800">
            Oke… Nah ternyata tiap pelanggan itu menghabiskan rata-rata 50 ribu di kafe kami. Kalau dengan budget iklan 750.000 dan 25 pelanggan yang hadir, berapa perkiraan keuntungan yang saya peroleh?
          </p>
        </div>
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-lg p-4 md:p-6 mx-2 sm:mx-4">
          <div className="text-right text-gray-500 text-xl mb-2 pr-2 h-8">{calculationHistory}</div>
          <div className="text-right text-black text-6xl font-light mb-6 pr-2 overflow-hidden whitespace-nowrap">{display}</div>
          <div className="grid grid-cols-4 gap-3">
            <button className={`${styles['calculator-button']} bg-gray-300 text-black`} onClick={handleClearClick}>C</button>
            <button className={`${styles['calculator-button']} bg-gray-300 text-black`} onClick={handleToggleSignClick}>+/-</button>
            <button className={`${styles['calculator-button']} bg-gray-300 text-black`} onClick={handlePercentageClick}>%</button>
            <button className={`${styles['calculator-button']} bg-blue-500 text-white`} onClick={() => handleOperatorClick('/')}>÷</button>

            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick(7)}>7</button>
            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick(8)}>8</button>
            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick(9)}>9</button>
            <button className={`${styles['calculator-button']} bg-blue-500 text-white`} onClick={() => handleOperatorClick('*')}>×</button>

            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick(4)}>4</button>
            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick(5)}>5</button>
            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick(6)}>6</button>
            <button className={`${styles['calculator-button']} bg-blue-500 text-white`} onClick={() => handleOperatorClick('-')}>-</button>

            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick(1)}>1</button>
            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick(2)}>2</button>
            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick(3)}>3</button>
            <button className={`${styles['calculator-button']} bg-blue-500 text-white`} onClick={() => handleOperatorClick('+')}>+</button>

            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick('.')}>.</button>
            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={() => handleNumberClick(0)}>0</button>
            <button className={`${styles['calculator-button']} bg-yellow-400 text-black`} onClick={handleBackspaceClick}>⌫</button>
            <button className={`${styles['calculator-button']} bg-blue-500 text-white`} onClick={handleEqualsClick}>=</button>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 w-full max-w-xs mx-auto mt-6 mb-4">
        <button 
          onClick={onBack}
          className="h-12 w-12 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition duration-200 flex items-center justify-center flex-none">
          <FaArrowLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={onNext}
          className='flex-1 h-12 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700'>
          Selanjutnya
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default M2Q2Scene;
