
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MascotImage from "@/components/mascot/MascotImage";

interface HeroVideoSectionProps {
  className?: string;
}

const HeroVideoSection = ({ className = "" }: HeroVideoSectionProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [playAttempted, setPlayAttempted] = useState(false);
  const [showFallback, setShowFallback] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Ensure the video is properly loaded
    const handleCanPlay = () => {
      console.log("Video can play now");
      setVideoLoaded(true);
      setShowFallback(false);
      
      if (!playAttempted) {
        setPlayAttempted(true);
        // Use a slight delay to improve playback success rate
        setTimeout(() => {
          video.play().catch(err => {
            console.log("Auto-play prevented:", err);
            // Keep video element visible even if autoplay fails
            setVideoLoaded(true);
            setShowFallback(true);
          });
        }, 300);
      }
    };
    
    // Event for when metadata is loaded (dimensions, duration)
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
    };
    
    // Add user interaction event to help with playback
    const handleUserInteraction = () => {
      if (video && videoLoaded && video.paused) {
        video.play().catch(err => {
          console.log("User-triggered play failed:", err);
          setShowFallback(true);
        });
      }
    };
    
    // Set up event listeners
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    
    // Explicitly show controls if autoplay fails
    video.addEventListener('pause', () => {
      if (videoLoaded) setShowFallback(true);
    });
    
    video.addEventListener('play', () => {
      setShowFallback(false);
    });
    
    // Force a load attempt
    video.load();
    
    return () => {
      // Clean up event listeners
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      video.removeEventListener('pause', () => setShowFallback(true));
      video.removeEventListener('play', () => setShowFallback(false));
    };
  }, [playAttempted, videoLoaded]);
  
  // Add a click handler directly on the video container
  const handleVideoContainerClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch(err => {
          console.log("Click play failed:", err);
          setShowFallback(true);
        });
      } else {
        video.pause();
      }
    }
  };

  return (
    <div className={`w-full max-w-md py-4 ${className}`}>
      <div 
        className="relative mx-auto hero-video-container cursor-pointer"
        onClick={handleVideoContainerClick}
        style={{
          maxWidth: "260px", 
          maxHeight: "260px",
          background: 'linear-gradient(to bottom right, #ffc0d6, #fff5f8)',
          borderColor: '#ffb0d0',
        }}
      >
        {(showFallback || !videoLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 to-white">
            <MascotImage variant="default" size="medium" />
            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-500">
              クリックして再生
            </div>
          </div>
        )}
        <video 
          ref={videoRef}
          playsInline
          muted 
          loop 
          preload="auto"
          className="hero-video w-full h-full rounded-lg shadow-md object-cover"
          poster="/lovable-uploads/daaffc30-c79d-48f1-ae00-6160772f79ca.png"
        >
          <source src="/Kawaii_Piggy_Bank.mp4" type="video/mp4" />
          あなたのブラウザはビデオをサポートしていません。
        </video>
      </div>
    </div>
  );
};

export default HeroVideoSection;
