
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import MascotCharacter from "@/components/mascot/MascotCharacter";
import MascotImage from "@/components/mascot/MascotImage";
import MoneyVisual from "@/components/ui/MoneyVisual";
import LeafVisual from "@/components/ui/LeafVisual";
import TontonGameVisuals from "@/components/game/TontonGameVisuals";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <span className="text-lg font-bold">P</span>
            </div>
            <h1 className="text-2xl font-bold text-[#333333]">Pigipe</h1>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <Link to="/modules">
                <Button variant="outline">学習を続ける</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">ログイン</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary hover:bg-primary/90">無料登録</Button>
                </Link>
              </>
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
              5分で学べるお金の知識
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              お金の不安をなくす<br />
              <span className="text-primary">学びのアプリ</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              専門家監修のミニゲームで、楽しく学んで実践力を身につけよう
            </p>
            <div className="pt-4 flex items-center gap-4">
              <Link to={isAuthenticated ? "/modules" : "/signup"}>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  {isAuthenticated ? "学習を始める" : "無料で始める"}
                </Button>
              </Link>
              <MoneyVisual type="coin" className="hidden md:flex" />
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

      {/* Modules Section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">5つのお金の学習モジュール</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            各モジュールは約5分で完了し、実践的なお金の知識を身につけられます
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
                      <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
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
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">利用者の声</h2>
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
        <p className="text-sm text-muted-foreground mb-4">学術監修</p>
        <div className="flex justify-center">
          <img 
            src="https://www.tohoku.ac.jp/japanese/common_img/loogo.png" 
            alt="東北大学" 
            className="h-12 object-contain"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#333333]">
                  <span className="text-sm font-bold">P</span>
                </div>
                <h3 className="text-xl font-bold">Pigipe</h3>
              </div>
              <p className="text-sm text-gray-400 mt-1">5分で学べるお金アプリ</p>
            </div>
            <div className="flex gap-6">
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                利用規約
              </Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                プライバシーポリシー
              </Link>
              <Link to="/company" className="text-sm text-gray-400 hover:text-white transition-colors">
                運営会社
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
            &copy; 2025 Pigipe All rights reserved.
          </div>
        </div>
      </footer>

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
