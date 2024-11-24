import React from 'react';

interface DinosaurProps {
  isJumping: boolean;
  ref: React.RefObject<HTMLDivElement>;
}

export const Dinosaur = React.forwardRef<HTMLDivElement, DinosaurProps>(
  ({ isJumping }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute bottom-0 left-16 w-12 h-12 transition-transform duration-500 
        ${isJumping ? '-translate-y-16' : 'translate-y-0'}`}
        style={{
          transform: `scaleX(-1) ${
            isJumping ? 'translateY(-4rem)' : 'translateY(0)'
          }`,
        }}
      >
        🦖
      </div>
    );
  }
);
