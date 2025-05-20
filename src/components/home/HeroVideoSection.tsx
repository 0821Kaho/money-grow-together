
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MascotImage from "@/components/mascot/MascotImage";
import MoneyVisual from "@/components/ui/MoneyVisual";

interface HeroVideoSectionProps {
  className?: string;
}

const HeroVideoSection = ({ className = "" }: HeroVideoSectionProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playAttempted, setPlayAttempted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleCanPlay = () => {
      setVideoLoaded(true);
      if (!playAttempted) {
        setPlayAttempted(true);
        video.play().catch(err => {
          console.log("Auto-play prevented:", err);
          // Keep video element visible even if autoplay fails
          setVideoLoaded(true);
        });
      }
    };
    
    // Event for when metadata is loaded (dimensions, duration)
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
      // Try to play once metadata is loaded
      if (!playAttempted) {
        setPlayAttempted(true);
        video.play().catch(err => {
          console.log("Auto-play prevented on metadata load:", err);
        });
      }
    };
    
    // Add manual play trigger when user interactions occur
    const handleUserInteraction = () => {
      if (video && videoLoaded && !video.paused) {
        video.play().catch(err => {
          console.log("User-triggered play failed:", err);
        });
      }
    };
    
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    // Preload the video
    video.load();
    
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [playAttempted]);

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
          playsInline
          muted 
          loop 
          preload="auto"
          className="hero-video w-full rounded-lg shadow-md"
          poster="/lovable-uploads/daaffc30-c79d-48f1-ae00-6160772f79ca.png"
        >
          <source src="/Kawaii_Piggy Bank.mp4" type="video/mp4" />
          あなたのブラウザはビデオをサポートしていません。
        </video>
        
        {/* Add floating coins as decorative elements */}
        <div className="absolute floating-coin" style={{ top: '10%', left: '10%', width: '20px', height: '20px' }}>
          <MoneyVisual type="coin" size="small" />
        </div>
        <div className="absolute floating-coin" style={{ top: '70%', left: '80%', width: '15px', height: '15px' }}>
          <MoneyVisual type="coin" size="small" />
        </div>
        <div className="absolute floating-coin" style={{ top: '40%', left: '85%', width: '12px', height: '12px' }}>
          <MoneyVisual type="coin" size="small" />
        </div>
      </div>
    </div>
  );
};

export default HeroVideoSection;
