
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
  
  // Check if element is in viewport
  const useOnScreen = (ref: React.RefObject<HTMLElement>) => {
    const [isIntersecting, setIntersecting] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIntersecting(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
  
      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }
  
      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
    }, [ref]);
  
    return isIntersecting;
  };
  
  const isOnScreen = useOnScreen(videoRef);
  
  // Handle video loading and playing/pausing based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleCanPlay = () => {
      console.log("Video can play now");
      setVideoLoaded(true);
    };
    
    const handleLoadedMetadata = () => {
      console.log("Video metadata loaded");
      setVideoLoaded(true);
    };
    
    // Play video when in viewport
    if (isOnScreen && videoLoaded && !playAttempted) {
      setPlayAttempted(true);
      video.play().catch(err => {
        console.log("Auto-play prevented:", err);
        setShowFallback(true);
      });
    }
    
    // Pause video when not in viewport (battery/performance saving)
    if (!isOnScreen && videoLoaded && !video.paused) {
      video.pause();
    }
    
    // Add event listeners
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [isOnScreen, videoLoaded, playAttempted]);
  
  // Handle user interaction
  const handleVideoContainerClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch(() => {
          setShowFallback(true);
        });
        setShowFallback(false);
      } else {
        video.pause();
        setShowFallback(true);
      }
    }
  };

  // Array of mascot variants for the thumbnail row
  const mascotVariants = [
    "question", // questioning pig
    "reading", // reading pig
    "default", // coin pig
    null, // center space for text
    "happy", // happy pig
    "running", // running pig
    "sleeping" // sleeping pig
  ];

  return (
    <div className={`mx-auto ${className}`}>
      {/* Thumbnail style container for social media */}
      <div className="thumbnail-container bg-[#FFFAEB] p-4 rounded-lg mb-4 hidden md:block">
        <div className="flex flex-col items-center">
          <h1 className="text-[#6B4B35] text-3xl font-bold mb-4">お金で夢をあきらめない</h1>
          
          <div className="flex items-center justify-center space-x-2 w-full">
            {mascotVariants.map((variant, index) => 
              variant === null ? (
                <div key="pigipe-text" className="text-[#FF8DC0] text-5xl font-bold px-4">
                  Pigipe
                </div>
              ) : (
                <div key={index} className="w-16 h-16">
                  <MascotImage 
                    variant={variant as any} 
                    size="small"
                    animate={true}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      
      {/* Regular hero video container */}
      <div 
        className="relative mx-auto hero-video-container cursor-pointer"
        onClick={handleVideoContainerClick}
      >
        {(showFallback || !videoLoaded) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-white rounded-lg">
            <div className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] max-w-[48vw]">
              <MascotImage variant="default" size="xl" className="w-full h-full" />
            </div>
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
          preload="metadata"
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
