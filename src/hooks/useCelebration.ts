
import { useState, useCallback } from 'react';

export const useCelebration = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const celebrate = useCallback(() => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    
    // Create confetti particles
    const confettiCount = 15;
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
    }, 800);
  }, [isPlaying]);

  const createConfettiParticle = (index: number) => {
    const particle = document.createElement('div');
    const colors = ['#FF708A', '#FFF2B0', '#B3E5FF', '#7ADFA2'];
    const emojis = ['🎉', '💰', '⭐', '🎊'];
    
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '20%';
    particle.style.fontSize = '20px';
    particle.style.zIndex = '9999';
    particle.style.pointerEvents = 'none';
    particle.style.userSelect = 'none';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
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
      duration: 800,
      easing: 'ease-out'
    });
    
    animation.onfinish = () => {
      particle.remove();
    };
  };

  return { celebrate, isPlaying };
};
