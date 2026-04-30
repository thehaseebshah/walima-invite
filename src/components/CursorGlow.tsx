import { useEffect, useState } from 'react';

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.hover === 'true'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.dataset.hover === 'true'
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="rounded-full bg-gold-400/30 blur-xl"
          style={{
            width: isHovering ? 60 : 30,
            height: isHovering ? 60 : 30,
            transition: 'width 0.3s ease, height 0.3s ease',
          }}
        />
      </div>
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="rounded-full border border-gold-400/60"
          style={{
            width: isHovering ? 40 : 8,
            height: isHovering ? 40 : 8,
            transition: 'width 0.3s ease, height 0.3s ease',
          }}
        />
      </div>
    </>
  );
}
