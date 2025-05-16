
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ImpactPage = () => {
  const { isAuthenticated } = useAuth();
  
  const roiData = [
    {
      title: "初年度の収入増加",
      value: "+56万円",
      description: "金融リテラシーによる支出削減と収入管理効率化"
    },
    {
      title: "3年後の資産形成",
      value: "+285万円",
      description: "複利効果と長期投資戦略の実践による資産増加"
    },
    {
      title: "10年後の総資産効果",
      value: "+810万円",
      description: "リスク管理と分散投資による持続的な資産成長"
    },
    {
      title: "生涯総便益（30年）",
      value: "+1,300万円",
      description: "金融教育による生涯に渡る経済的意思決定の最適化"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-logo text-[#333333]">Pigipe</h1>
          </Link>
          <Link to="/" className="ml-auto flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>トップへ戻る</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-heading font-bold mb-6 text-center">
            どうして遊んでお金を学ぶだけで<br />
            最大 +1,300 万円の価値になるの？
          </h1>

          {/* ROI Cards */}
          <div className="space-y-4 mb-8">
            {roiData.map((item, index) => (
              <Card key={index} className="bg-white shadow-sm rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{item.value}</p>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footnotes & Source */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                <sup className="text-xs mr-1">*1</sup>
                便益計算は、通常の金融教育を受けていない人と比較した、生涯に渡る経済的アウトカムの差に基づいています。
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs mb-2">学術監修</p>
                  <img 
                    src="https://www.tohoku.ac.jp/japanese/common_img/loogo.png" 
                    alt="東北大学" 
                    className="h-6 object-contain"
                  />
                </div>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary underline"
                >
                  詳細レポート (PDF)
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mb-12">
            <Link to={isAuthenticated ? "/modules" : "/signup"}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                {isAuthenticated ? "学習を始める" : "今すぐ学習を始める"}
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#333333] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-logo">Pigipe</h3>
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
              <Link to="/impact" className="text-sm text-gray-400 hover:text-white transition-colors">
                社会インパクト
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
    </div>
  );
};

export default ImpactPage;
