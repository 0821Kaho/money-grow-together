import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MascotImage from "@/components/mascot/MascotImage";
import MoneyVisual from "@/components/ui/MoneyVisual";

interface HeroVideoSectionProps {
  className?: string;
}

const HeroVideoSection = ({ className = "" }: HeroVideoSectionProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleCanPlay = () => {
      setVideoLoaded(true);
      video.play().catch(err => {
        console.log("Auto-play prevented:", err);
        // Keep video element visible even if autoplay fails
        setVideoLoaded(true);
      });
    };
    
    video.addEventListener('canplaythrough', handleCanPlay);
    
    // Try to load and play the video
    video.load();
    
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, []);

  return (
    <div className={`w-full max-w-lg py-8 ${className}`}>
      <div className="relative mx-auto hero-video-container">
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
            <MascotImage variant="default" size="medium" />
          </div>
        )}
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="hero-video"
          preload="auto"
        >
          <source src="/Kawaii_Piggy Bank.mp4" type="video/mp4" />
          あなたのブラウザはビデオをサポートしていません。
        </video>
        
        {/* Add floating coins as decorative elements */}
        <div className="floating-coin" style={{ top: '10%', left: '10%', width: '20px', height: '20px' }}>
          <MoneyVisual type="coin" size="small" />
        </div>
        <div className="floating-coin" style={{ top: '70%', left: '80%', width: '15px', height: '15px' }}>
          <MoneyVisual type="coin" size="small" />
        </div>
        <div className="floating-coin" style={{ top: '40%', left: '85%', width: '12px', height: '12px' }}>
          <MoneyVisual type="coin" size="small" />
        </div>
      </div>
    </div>
  );
};

export default HeroVideoSection;
