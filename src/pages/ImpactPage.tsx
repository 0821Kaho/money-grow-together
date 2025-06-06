
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, FileText, TrendingUp, Shield, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ImpactPage = () => {
  const isMobile = useIsMobile();
  
  const personalBenefits = [
    {
      title: "高金利借⼊回避・利息削減",
      valueConservative: "¥200,000",
      valueAverage: "¥2,000,000",
      description: "金利理解→高⾦利ローンの回避"
    },
    {
      title: "早期からの積立投資リターン",
      valueConservative: "¥600,000",
      valueAverage: "¥8,000,000",
      description: "複利効果を活かした長期投資"
    },
    {
      title: "収⼊向上・副業効果",
      valueConservative: "¥200,000",
      valueAverage: "¥3,000,000",
      description: "スキル習得 → 収⼊アップ"
    }
  ];

  const governmentEffects = [
    {
      title: "追加税収（所得税・消費税・譲渡益税）",
      value: "+¥200,000〜300,000 / 人",
      description: "生涯税率 20% 前提"
    },
    {
      title: "生活保護・延滞滞納などの公的支出抑制",
      value: "最大 ¥1,500,000 / 人",
      description: "生活保護10年回避ケース"
    },
    {
      title: "政府 ROI（投下資本比）",
      value: "20〜30×",
      description: "1人¥10,000の学習コストに対し税収で回収"
    }
  ];

  const societalPoints = [
    "公共支出削減 + 税収増加を合わせると、社会全体では数十倍規模のリターン。",
    "家計破綻や⾼⾦利ローン問題の減少は、治安・メンタルヘルス指標にも寄与。",
    "次世代の経済格差縮小により、長期的な生産性向上が期待される。"
  ];

  const sources = [
    "Champlain College \"2023 National Report Card on HS Financial Literacy\"",
    "Tyton Partners \"Investing in Tomorrow\"",
    "東北大学 × NextGens 共同研究（進行中） — 金融教育が社会経済に及ぼす影響評価"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-logo font-bold text-[#333333]">Pigipe</h1>
          </Link>
          <Link to="/" className="ml-auto flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>トップへ戻る</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4">社会インパクト</Badge>
            <h1 className={`${isMobile ? "text-2xl" : "text-3xl md:text-4xl"} font-heading font-bold mb-3 text-[#333333]`}>
              ピギペがもたらす<br className="md:hidden" />
              経済・社会的効果
            </h1>
            <p className={`${isMobile ? "text-base" : "text-lg"} text-muted-foreground italic`}>
              個人のライフタイム便益から<br className="md:hidden" />
              政府財政への貢献まで
            </p>
          </div>

          {/* Section 1: Personal Benefits */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className={`${isMobile ? "text-xl" : "text-2xl"} font-heading font-bold`}>
                1. 個人レベル：<br className="md:hidden" />
                生涯で得られる経済便益
              </h2>
            </div>
            
            <div className="mb-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-[25%] whitespace-nowrap">内訳</TableHead>
                    <TableHead className="w-[20%] whitespace-nowrap">便益（保守）</TableHead>
                    <TableHead className="w-[20%] whitespace-nowrap">便益（平均）</TableHead>
                    <TableHead className="w-[35%] whitespace-nowrap">しくみ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personalBenefits.map((benefit, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <TableCell className="font-medium whitespace-nowrap">{benefit.title}</TableCell>
                      <TableCell className="text-rose-600 font-bold whitespace-nowrap">{benefit.valueConservative}</TableCell>
                      <TableCell className="text-primary font-bold whitespace-nowrap">{benefit.valueAverage}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{benefit.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="font-bold">合計試算：最大 +13,000,000 円</p>
              <p className="text-sm text-muted-foreground italic">
                *米国高校15hコース試験 (US$100k) を日本換算／早期投資効果を含む
              </p>
            </div>
          </section>

          {/* Section 2: Government Benefits */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className={`${isMobile ? "text-xl" : "text-2xl"} font-heading font-bold`}>
                2. 政府レベル：<br className="md:hidden" />
                財政・公共支出へのプラス効果
              </h2>
            </div>
            
            <div className="mb-6">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="w-[40%] whitespace-nowrap">効果</TableHead>
                    <TableHead className="w-[25%] whitespace-nowrap">金額／倍率</TableHead>
                    <TableHead className="w-[35%] whitespace-nowrap">詳細</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {governmentEffects.map((effect, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <TableCell className="font-medium whitespace-nowrap">{effect.title}</TableCell>
                      <TableCell className="text-primary font-bold whitespace-nowrap">{effect.value}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{effect.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-bold">要点</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                <li>金融教育による <span className="font-medium">負債削減 → 延滞・破産の減少</span> は地方自治体の福祉コストを直接軽減。</li>
                <li>早期投資と副業収⼊による <span className="font-medium">所得増加 → 税基盤拡⼤</span>。</li>
                <li>公教育ではカバーしきれない部分を Pigipe が担い、<span className="font-medium">国の金融リテラシー向上施策と補完関係</span>。</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Social ROI */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className={`${isMobile ? "text-xl" : "text-2xl"} font-heading font-bold`}>
                3. 社会 ROI（Public ROI）
              </h2>
            </div>
            
            <ul className="space-y-4">
              {societalPoints.map((point, index) => (
                <li key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                  <p>{point}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: Sources */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className={`${isMobile ? "text-xl" : "text-2xl"} font-heading font-bold`}>
                4. 出典・エビデンス
              </h2>
            </div>
            
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {sources.map((source, index) => (
                <li key={index} className="italic">{source}</li>
              ))}
            </ul>
          </section>

          {/* Section 5: Summary */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className={`${isMobile ? "text-xl" : "text-2xl"} font-heading font-bold`}>
                5. まとめ
              </h2>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <p className="mb-4">
                ピギペは、<span className="font-bold">完全無料で学べる金融教育プログラム</span> を通じ
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>個人に <span className="text-primary font-bold">+1,300万円相当</span> の生涯便益</li>
                <li>政府に <span className="text-primary font-bold">20〜30倍の財政 ROI</span></li>
              </ul>
              <p>をもたらす可能性を、実証研究と実ユーザーデータで示します。</p>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Mail className="h-5 w-5" />
                <p className="font-medium">お問い合わせ</p>
              </div>
              <p className="text-muted-foreground mb-3">
                詳しい分析レポート (PDF) をご希望の政策担当者・研究者の方は以下までお問い合わせください。
              </p>
              <a 
                href="mailto:satoyoshi.kaho@outlook.jp" 
                className="inline-flex items-center text-primary hover:underline"
              >
                satoyoshi.kaho@outlook.jp
              </a>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center mb-12">
            <Link to="/modules">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                学習を始める
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImpactPage;
