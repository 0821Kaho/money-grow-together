
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MascotImage from "@/components/mascot/MascotImage";

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
    
    // Ensure the video is properly loaded
    const handleCanPlay = () => {
      console.log("Video can play now");
      setVideoLoaded(true);
      if (!playAttempted) {
        setPlayAttempted(true);
        // Use a slight delay to improve playback success rate
        setTimeout(() => {
          video.play().catch(err => {
            console.log("Auto-play prevented:", err);
            // Keep video element visible even if autoplay fails
            setVideoLoaded(true);
          });
        }, 100);
      }
    };
    
    // Event for when metadata is loaded (dimensions, duration)
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
      video.load(); // Explicitly reload for better compatibility
    };
    
    // Add user interaction event to help with playback
    const handleUserInteraction = () => {
      if (video && videoLoaded && video.paused) {
        video.play().catch(err => {
          console.log("User-triggered play failed:", err);
        });
      }
    };
    
    // Set up event listeners
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    // Add visible controls to allow user-initiated playback if autoplay fails
    video.controls = false;
    
    // Ensure video is preloaded
    video.preload = "auto";
    
    // Force a load attempt
    video.load();
    
    return () => {
      // Clean up event listeners
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [playAttempted, videoLoaded]);
  
  // Add a click handler directly on the video container
  const handleVideoContainerClick = () => {
    const video = videoRef.current;
    if (video && video.paused) {
      video.play().catch(err => console.log("Click play failed:", err));
    }
  };

  return (
    <div className={`w-full max-w-sm mx-auto py-4 ${className}`}>
      <div 
        className="relative hero-video-container cursor-pointer"
        style={{
          background: 'linear-gradient(to bottom right, #ffc0d6, #fff5f8)',
          borderColor: '#ffb0d0',
          width: '220px',
          height: '220px',
          margin: '0 auto',
        }}
        onClick={handleVideoContainerClick}
      >
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 to-white">
            <MascotImage variant="default" size="small" />
          </div>
        )}
        <video 
          ref={videoRef}
          autoPlay 
          playsInline
          muted 
          loop 
          preload="auto"
          className="hero-video w-full h-full rounded-lg"
          poster="/lovable-uploads/daaffc30-c79d-48f1-ae00-6160772f79ca.png"
        >
          <source src="/Kawaii_Piggy Bank.mp4" type="video/mp4" />
          あなたのブラウザはビデオをサポートしていません。
        </video>
      </div>
    </div>
  );
};

export default HeroVideoSection;
