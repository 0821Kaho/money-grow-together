import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MascotImage from "@/components/mascot/MascotImage";
import MoneyVisual from "@/components/ui/MoneyVisual";
import LeafVisual from "@/components/ui/LeafVisual";
import KPIBanner from "@/components/home/KPIBanner";
import PreRegisterForm from "@/components/preregister/PreRegisterForm";
import Footer from "@/components/layout/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-bold text-[#333333]">Pigipe</h1>
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
              ピギペと遊んで学べるお金アプリ
            </p>
            <div className="pt-4 flex items-center gap-4">
              <Badge className="bg-accent/20 text-accent-foreground border-none px-3 py-1">
                2025年5月22日 サービス開始
              </Badge>
              <MoneyVisual type="coin" className="hidden md:flex" />
            </div>
            
            {/* Pre-registration form */}
            <div className="pt-6">
              <PreRegisterForm />
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

      {/* KPI Banner */}
      <section className="container mx-auto px-4 pb-12">
        <KPIBanner />
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
