
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import MascotCharacter from "@/components/mascot/MascotCharacter";
import MascotImage from "@/components/mascot/MascotImage";
import MoneyVisual from "@/components/ui/MoneyVisual";
import LeafVisual from "@/components/ui/LeafVisual";
import TontonGameVisuals from "@/components/game/TontonGameVisuals";
import KPIBanner from "@/components/home/KPIBanner";
import Countdown from "@/components/prelaunch/Countdown";
import PreRegisterForm from "@/components/prelaunch/PreRegisterForm";
import { ArrowDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef, useState } from "react";

const modules = [
  { 
    id: "budget", 
    title: "家計管理", 
    description: "お金の使い方を見直し、貯金体質になるための基礎を学びます", 
    color: "bg-primary/10" 
  },
  { 
    id: "investment", 
    title: "投資", 
    description: "長期的な資産形成のための投資の基本を学びます", 
    color: "bg-secondary/10" 
  },
  { 
    id: "risk", 
    title: "リスク管理", 
    description: "お金のリスクを理解し、適切に対策する方法を学びます", 
    color: "bg-accent/10" 
  },
  { 
    id: "lifeplan", 
    title: "ライフプラン", 
    description: "将来の人生設計と必要な資金計画について学びます", 
    color: "bg-primary/10" 
  },
  { 
    id: "startup", 
    title: "副業・起業", 
    description: "小さな一歩から始める副業や起業の考え方を学びます", 
    color: "bg-secondary/10" 
  },
];

const testimonials = [
  {
    name: "田中さん（29歳）",
    before: "貯金ができず、給料日前はいつもカツカツでした",
    after: "家計管理モジュールで支出を見直し、毎月3万円の貯金ができるようになりました"
  },
  {
    name: "佐藤さん（35歳）",
    before: "投資に興味はあったけど、怖くて一歩踏み出せませんでした",
    after: "投資モジュールでリスクとリターンの関係を理解し、少額から投資を始められました"
  },
  {
    name: "鈴木さん（42歳）",
    before: "老後のお金が不安で、夜も眠れないことがありました",
    after: "ライフプランを立てることで将来の見通しができ、具体的な行動計画ができました"
  }
];

const Index = () => {
  const { isAuthenticated } = useAuth();
  const launchDate = "2025-05-22T20:00:00+09:00"; // Updated to May 22, 2025, 20:00 JST
  const arrowRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Function to handle scrolling to the waitlist form
  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Function to occasionally bounce the arrow
  useEffect(() => {
    const arrowElement = arrowRef.current;
    if (!arrowElement) return;
    
    // Add occasional bounce animation every 3 seconds
    const interval = setInterval(() => {
      arrowElement.classList.add("animate-bounce");
      
      // Remove animation class after animation completes
      setTimeout(() => {
        arrowElement.classList.remove("animate-bounce");
      }, 1000);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-bold text-[#333333]">Pigipe</h1>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Button variant="outline" disabled className="opacity-70">公開後に開始できます</Button>
            ) : (
              <Button variant="outline" disabled className="opacity-70">公開後に開始できます</Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with enhanced styling and animation */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <motion.div 
          className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Headline */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            お金で<span className="text-primary">夢をあきらめない</span>
          </h1>
          
          {/* Sub-headline */}
          <p className="text-lg text-muted-foreground max-w-lg">
            ピギペと遊んで学べる完全無料のお金のアプリ
          </p>
          
          {/* Hero Video with Mascot Animation */}
          <div className="w-full max-w-lg py-8">
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
          
          {/* CTA Button */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5
            }}
          >
            <Button 
              onClick={scrollToForm} 
              size="lg" 
              className="rounded-full shadow-lg bg-primary hover:bg-primary/90"
            >
              事前登録する
            </Button>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            ref={arrowRef}
            className="text-muted-foreground mt-2 cursor-pointer"
            onClick={scrollToForm}
          >
            <ArrowDown className="mx-auto h-6 w-6" />
          </motion.div>
          
          {/* Countdown */}
          <Countdown targetDate={launchDate} className="w-full mt-8" />
          
          {/* Pre-register form */}
          <div id="waitlist-form" className="w-full max-w-md mx-auto pt-8">
            <PreRegisterForm className="w-full" />
          </div>
        </motion.div>
      </section>
      
      <hr className="border-t border-dashed border-gray-200 my-12 max-w-4xl mx-auto" />

      {/* KPI Banner - Replaced with Video */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative mx-auto rounded-xl overflow-hidden shadow-lg">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full"
              preload="auto"
            >
              <source src="/Kawaii_Piggy Bank.mp4" type="video/mp4" />
              あなたのブラウザはビデオをサポートしていません。
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent flex items-center p-8">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">+1,300万</h3>
                <p className="text-sm font-medium">ユーザーが貯めた平均金額</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">5つのお金の学習モジュール</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            各モジュールは短時間で完了し、実践的なお金の知識を身につけられます
          </p>
          <div className="flex justify-center mt-4">
            <TontonGameVisuals type="combined" size="small" />
          </div>
        </div>

        <div className="overflow-hidden px-4">
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {modules.map((module) => (
                <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className={`h-full ${module.color} border-none shadow-sm hover:shadow transition-all`}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                      <p className="text-muted-foreground text-sm">{module.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static mx-2 translate-y-0" />
              <CarouselNext className="static mx-2 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">利用者の声</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Pigipeを使って学んだユーザーの変化をご紹介します
            </p>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, i) => (
                <CarouselItem key={i}>
                  <Card className="border-none shadow mx-4">
                    <CardContent className="p-8">
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-red-50 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground font-medium mb-2">BEFORE</p>
                            <p className="italic">「{testimonial.before}」</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground font-medium mb-2">AFTER</p>
                            <p className="italic">「{testimonial.after}」</p>
                          </div>
                        </div>
                        <p className="text-right font-medium">{testimonial.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static mx-2 translate-y-0" />
              <CarouselNext className="static mx-2 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* University Logo */}
      <section className="py-12 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">学術監修</p>
          <div className="flex justify-center">
            <img 
              src="https://www.tohoku.ac.jp/japanese/common_img/loogo.png" 
              alt="東北大学" 
              className="h-12 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Floating Mascot */}
      <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6 hidden md:block">
        <MascotImage 
          variant="default" 
          size="large" 
          className="shadow-md" 
        />
      </div>
    </div>
  );
};

export default Index;
