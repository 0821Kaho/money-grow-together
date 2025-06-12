
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface XPFloatProps {
  onTrigger?: () => void;
}

interface XPParticle {
  id: number;
  x: number;
  y: number;
  value: number;
}

export const XPFloat = ({ onTrigger }: XPFloatProps) => {
  const [particles, setParticles] = useState<XPParticle[]>([]);

  const triggerXP = useCallback((x: number = 50, y: number = 50, value: number = 10) => {
    const newParticle: XPParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      value
    };
    
    setParticles(prev => [...prev, newParticle]);
    onTrigger?.();
    
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  }, [onTrigger]);

  return (
    <>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -30, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="bg-pigipeBlue text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              +{particle.value} XP
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

// Export the trigger function for external use
export const useXPFloat = () => {
  const [floatComponent, setFloatComponent] = useState<React.ReactElement | null>(null);
  
  const triggerXP = useCallback((x: number = 50, y: number = 50, value: number = 10) => {
    const component = <XPFloat key={Date.now()} />;
    setFloatComponent(component);
    
    setTimeout(() => {
      setFloatComponent(null);
    }, 1000);
  }, []);

  return { triggerXP, floatComponent };
};
