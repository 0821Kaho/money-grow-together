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

  return (
    <>
      {/* Social Media Thumbnail - Only visible in exported images but hidden on actual site */}
      <div className="social-media-thumbnail hidden">
        <img 
          src="/lovable-uploads/43420c5e-8e4d-4dcd-8f17-4c88bde90a20.png" 
          alt="Pigipe - お金で夢をあきらめない" 
          className="w-full"
        />
      </div>

      <div className={`mx-auto ${className}`}>
        <div 
          className="relative mx-auto hero-video-container cursor-pointer"
          onClick={handleVideoContainerClick}
        >
          {(showFallback || !videoLoaded) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-white rounded-lg">
              <div className="w-[360px] sm:w-[440px] md:w-[520px] lg:w-[560px] max-w-[96vw]">
                <MascotImage variant="default" size="xl" className="w-full h-full" />
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
    </>
  );
};

export default HeroVideoSection;
