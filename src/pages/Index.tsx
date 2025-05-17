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
import Footer from "@/components/layout/Footer";
import { ArrowDown } from "lucide-react";

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
  const launchDate = "2025-05-23T10:00:00+09:00";
  
  // Function to handle scrolling to the waitlist form
  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-6">
            <Badge variant="secondary" className="text-secondary bg-secondary/10">
              遊んで学べるお金の知識
            </Badge>
            <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
              お金で<span className="text-primary">夢をあきらめない</span>
            </h1>
            <p className="text-lg font-body text-muted-foreground">
              Pigipeはピギペと遊んで学べるお金アプリ
            </p>
            
            {/* Countdown Timer */}
            <Countdown targetDate={launchDate} className="my-6" />
            
            <div className="pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg px-8 font-number font-bold w-full md:w-auto group"
                onClick={scrollToForm}
                aria-label="事前登録フォームへスクロール"
              >
                事前登録フォームへ
                <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="flex justify-center items-center relative">
              <div className="absolute -left-8 top-4 -rotate-12 z-10">
                <MascotImage variant="coin" size="medium" />
              </div>
              <div className="absolute -right-8 top-16 rotate-12 z-10">
                <MascotImage variant="calculator" size="medium" />
              </div>
              <div className="absolute left-1/4 -top-8 z-10">
                <MoneyVisual type="coin" size="small" className="animate-bounce" />
              </div>
              <div className="absolute right-1/4 -top-4 z-10">
                <LeafVisual type="single" size="small" className="animate-float" />
              </div>
              <motion.div 
                className="relative z-20 bg-white/90 p-8 rounded-3xl shadow-lg border-2 border-primary/20"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MascotImage variant="happy" size="xl" />
              </motion.div>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden md:block">
              <LeafVisual type="multiple" size="large" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pre-register Form */}
      <section className="container mx-auto px-4 pb-12">
        <PreRegisterForm className="max-w-md mx-auto" id="waitlist-form" />
      </section>

      {/* KPI Banner */}
      <section className="container mx-auto px-4 pb-12">
        <KPIBanner />
      </section>

      {/* Modules Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-subheading mb-4">5つのお金の学習モジュール</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            各モジュールは短時間で完了し、実践的なお金の知識を身につけられます
          </p>
          <div className="flex justify-center mt-4">
            <TontonGameVisuals type="combined" size="small" />
          </div>
        </div>

        <div className="overflow-hidden px-4">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {modules.map((module) => (
                <CarouselItem key={module.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className={`h-full ${module.color} border-none shadow-sm hover:shadow transition-all`}>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-heading font-subheading mb-2">{module.title}</h3>
                      <p className="text-muted-foreground text-sm font-body">{module.description}</p>
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
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-subheading mb-4">利用者の声</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
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
                            <p className="text-sm text-muted-foreground font-body font-medium mb-2">BEFORE</p>
                            <p className="italic font-body">「{testimonial.before}」</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground font-body font-medium mb-2">AFTER</p>
                            <p className="italic font-body">「{testimonial.after}」</p>
                          </div>
                        </div>
                        <p className="text-right font-body font-medium">{testimonial.name}</p>
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
        <p className="text-sm text-muted-foreground mb-4 font-body">学術監修</p>
        <div className="flex justify-center">
          <img 
            src="https://www.tohoku.ac.jp/japanese/common_img/loogo.png" 
            alt="東北大学" 
            className="h-12 object-contain"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating Mascot */}
      <div className="fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6">
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
