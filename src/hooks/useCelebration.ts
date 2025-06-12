
import { useState, useCallback } from 'react';

export const useCelebration = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const celebrate = useCallback(() => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    // Create confetti particles with kawaii colors
    const confettiCount = 120;
    for (let i = 0; i < confettiCount; i++) {
      createConfettiParticle(i);
    }
    
    // Play sound effect (if available)
    try {
      const audio = new Audio('/sounds/coin.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore if audio fails to play
      });
    } catch (error) {
      // Ignore audio errors
    }
    
    setTimeout(() => {
      setIsPlaying(false);
    }, 700);
  }, [isPlaying]);

  const createConfettiParticle = (index: number) => {
    const particle = document.createElement('div');
    const kawaiiColors = ['#FF708A', '#7ADFA2', '#CDEFFF', '#FFF4B8', '#EFD5FF'];
    const emojis = ['⭐', '🎉', '💖', '✨', '🌟'];
    
    // Random choice between color triangle and emoji
    const useEmoji = Math.random() < 0.6;
    
    if (useEmoji) {
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.fontSize = Math.random() * 10 + 15 + 'px';
    } else {
      // Create triangle with kawaii colors
      particle.style.width = '0';
      particle.style.height = '0';
      const size = Math.random() * 6 + 4;
      particle.style.borderLeft = `${size}px solid transparent`;
      particle.style.borderRight = `${size}px solid transparent`;
      particle.style.borderBottom = `${size * 1.5}px solid ${kawaiiColors[Math.floor(Math.random() * kawaiiColors.length)]}`;
    }
    
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '20%';
    particle.style.zIndex = '9999';
    particle.style.pointerEvents = 'none';
    particle.style.userSelect = 'none';
    
    document.body.appendChild(particle);
    
    // Animate the particle
    const animation = particle.animate([
      { 
        transform: 'translateY(0) rotate(0deg)', 
        opacity: 1 
      },
      { 
        transform: `translateY(200px) rotate(${Math.random() * 360}deg)`, 
        opacity: 0 
      }
    ], {
      duration: 700,
      easing: 'ease-out'
    });
    
    animation.onfinish = () => {
      particle.remove();
    };
  };

  return { celebrate, isPlaying };
};
