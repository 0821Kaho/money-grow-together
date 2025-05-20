
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

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

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">利用者の声</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <span className="sm:inline block">Pigipeを使って学んだ</span>
            <span className="sm:inline block">ユーザーの変化をご紹介します</span>
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
  );
};

export default TestimonialsSection;
