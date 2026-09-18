import React, { useState, useEffect } from 'react';

interface Theme05PreloaderProps {
  onComplete: () => void;
}

const GREETINGS = [
  { text: 'Hello', font: "'Inter', sans-serif", color: '#ffffff', weight: 800, italic: false },
  { text: 'Namaste', font: "'Playfair Display', serif", color: '#c9a876', weight: 700, italic: true },
  { text: 'Bonjour', font: "'Caveat', cursive", color: '#ffffff', weight: 700, italic: false },
  { text: 'こんにちは', font: "'Noto Sans JP', sans-serif", color: '#c9a876', weight: 700, italic: false },
  { text: 'Hola', font: "'Anton', sans-serif", color: '#ffffff', weight: 400, italic: false },
  { text: '안녕하세요', font: "'Noto Sans KR', sans-serif", color: '#c9a876', weight: 700, italic: false },
  { text: 'Ciao', font: "'Playfair Display', serif", color: '#ffffff', weight: 700, italic: true },
  { text: 'مرحبا', font: "'Noto Sans Arabic', sans-serif", color: '#c9a876', weight: 700, italic: false },
  { text: 'Guten Tag', font: "'Caveat', cursive", color: '#ffffff', weight: 700, italic: false },
  { text: 'Hi, I’m Prajwal', font: "'Anton', sans-serif", color: '#c9a876', weight: 400, italic: false }
];

export const Theme05Preloader: React.FC<Theme05PreloaderProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isWordActive, setIsWordActive] = useState(true);
  const [phase, setPhase] = useState<'words' | 'signature' | 'fadeOut' | 'done'>('words');

  useEffect(() => {
    if (phase !== 'words') return;

    const HOLD = 360;
    const GAP = 90;

    const timer = setTimeout(() => {
      setIsWordActive(false);

      const nextTimer = setTimeout(() => {
        if (index + 1 < GREETINGS.length) {
          setIndex(index + 1);
          setIsWordActive(true);
        } else {
          setPhase('signature');
        }
      }, GAP);

      return () => clearTimeout(nextTimer);
    }, HOLD);

    return () => clearTimeout(timer);
  }, [index, phase]);

  useEffect(() => {
    if (phase === 'signature') {
      const t1 = setTimeout(() => {
        setPhase('fadeOut');
      }, 1200);

      const t2 = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 2100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  const currentGreeting = GREETINGS[index] || GREETINGS[0];

  return (
    <div
      id="preloader"
      className={`fixed inset-0 z-[9999] bg-[#0c0c0c] flex flex-col items-center justify-center transition-all duration-900 cubic-bezier(0.76, 0, 0.24, 1) ${
        phase === 'fadeOut' ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Hello Stage */}
      {phase === 'words' && (
        <div className="relative w-[80vw] max-w-[780px] h-[140px] flex items-center justify-center">
          <div
            className={`absolute left-1/2 top-1/2 whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2 transition-all duration-450 ease-out text-[clamp(42px,9vw,104px)] select-none ${
              isWordActive
                ? 'opacity-100 blur-0 scale-100 rotate-0'
                : 'opacity-0 blur-md scale-125 rotate-3'
            }`}
            style={{
              fontFamily: currentGreeting.font,
              color: currentGreeting.color,
              fontWeight: currentGreeting.weight,
              fontStyle: currentGreeting.italic ? 'italic' : 'normal',
            }}
          >
            {currentGreeting.text}
          </div>

          {/* Dots tick indicator */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex gap-1.5">
            {GREETINGS.map((_, i) => (
              <span
                key={i}
                className={`w-1 h-1 rounded-full transition-all duration-250 ${
                  i <= index ? 'bg-[#c9a876] scale-125' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Finale Signature */}
      {(phase === 'signature' || phase === 'fadeOut') && (
        <div className="flex flex-col items-center justify-center animate-in fade-in duration-300">
          <svg viewBox="0 0 140 90" className="w-[180px] h-[110px]" fill="none">
            <path
              d="M20 70 C 20 30, 30 15, 38 15 C 46 15, 40 45, 30 60 C 40 55, 55 30, 65 30 C 72 30, 65 55, 70 60 C 78 50, 90 25, 100 25 C 108 25, 100 55, 112 45"
              stroke="#c9a876"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="signature-path"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

