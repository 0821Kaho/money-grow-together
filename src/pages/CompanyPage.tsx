
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, Users, Briefcase, FileText, FileSearch, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

const CompanyPage = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Sticky Header with blur effect */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-gray-100/50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-heading font-bold text-[#333333]">Pigipe</h1>
            </Link>
            <Link to="/" className="ml-auto flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>トップへ戻る</span>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Hero Section */}
        <section className="py-20 sm:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute inset-0 -z-10 bg-[#FFF8E1] opacity-30 blur-3xl rounded-full"></div>
            <motion.h1 
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              金融リテラシーで、<br className="sm:hidden" />
              <span className="text-primary">すべての子どもと大人に</span><br className="sm:hidden" />
              次のチャンスを。
            </motion.h1>
            <p className="font-body text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              エデュテインメント × FinTech で<br className={isMobile ? "" : "hidden"} />
              機会格差をなくす
            </p>
            <Link to="/">
              <Button size="lg" className="rounded-xl">
                サービスを見る
              </Button>
            </Link>
          </div>
        </section>

        {/* Separator */}
        <div className="container mx-auto px-4">
          <hr className="border-t border-dashed border-gray-200 max-w-4xl mx-auto" />
        </div>

        {/* 2. Vision & Mission Section */}
        <section className="py-16 sm:py-24 container mx-auto px-4">
          <h2 className={`font-heading ${isMobile ? "text-2xl" : "text-3xl"} font-subheading text-center mb-12`}>ビジョン & ミッション</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-subheading mb-3">ビジョン</h3>
              <p className="font-body text-gray-700">「誰もがお金で夢をあきらめない世界を創る」</p>
            </div>
            
            <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-subheading mb-3">ミッション</h3>
              <p className="font-body text-gray-700">「研究とテクノロジーで金融教育を"楽しく・身近"に」</p>
            </div>
          </div>
        </section>

        {/* 3. Business Domains Section */}
        <section className="py-16 sm:py-24 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <h2 className={`font-heading ${isMobile ? "text-2xl" : "text-3xl"} font-subheading text-center mb-12`}>事業内容</h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 h-full">
                <div className="bg-primary/10 p-3 inline-flex rounded-full mb-2">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-subheading">Edutainment × FinTech</h3>
                <p className="font-body text-gray-700 text-sm">
                  研究成果に基づく金融学習アプリ／ゲーム開発
                </p>
              </div>
              
              <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 h-full">
                <div className="bg-secondary/10 p-3 inline-flex rounded-full mb-2">
                  <Briefcase className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-heading text-lg font-subheading">マーケティング・PR 受託</h3>
                <p className="font-body text-gray-700 text-sm">
                  EdTech/FinTech スタートアップ向けグロース支援
                </p>
              </div>
              
              <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 h-full">
                <div className="bg-accent/10 p-3 inline-flex rounded-full mb-2">
                  <Briefcase className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="font-heading text-lg font-subheading">海外営業受託</h3>
                <ul className="font-body text-gray-700 text-sm list-disc list-inside">
                  <li>日本→海外：市場展開サポート</li>
                  <li>海外→日本：販売支援</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* 4. Company Profile Section */}
        <section className="py-16 sm:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`font-heading ${isMobile ? "text-2xl" : "text-3xl"} font-subheading text-center mb-12`}>会社基本情報</h2>
            <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#F5F5F5] p-2 rounded-full">
                  <FileText className="h-5 w-5 text-gray-700" />
                </div>
                <h3 className="font-heading text-lg font-subheading">会社概要</h3>
              </div>
              
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium w-32">社名</TableCell>
                    <TableCell>株式会社NextGens</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">所在地</TableCell>
                    <TableCell>〒176-0081 東京都練馬区北町2-29-10</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">営業所</TableCell>
                    <TableCell>〒150-0001 東京都渋谷区神宮前6-23-4 桑野ビル2階</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">電話</TableCell>
                    <TableCell>03-6750-7041</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">メール</TableCell>
                    <TableCell>
                      <a href="mailto:satoyoshi.kaho@outlook.jp" className="text-primary hover:underline">
                        satoyoshi.kaho@outlook.jp
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">資本金</TableCell>
                    <TableCell>4,000,000円</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">設立</TableCell>
                    <TableCell>2024年11月</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">代表</TableCell>
                    <TableCell>里吉夏帆</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* 5. Research & Development Section */}
        <section className="py-16 sm:py-24 bg-[#F9F9F9]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className={`font-heading ${isMobile ? "text-2xl" : "text-3xl"} font-subheading text-center mb-12`}>研究開発</h2>
              
              <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-secondary/10 p-2 rounded-full">
                    <FileSearch className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-heading text-lg font-subheading">研究テーマと進捗</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="border-l-2 border-primary pl-4 ml-4 relative">
                    <div className="absolute w-3 h-3 rounded-full bg-primary -left-[6.5px] top-1.5"></div>
                    <h4 className="font-heading text-md font-subheading">2024年 - 現在</h4>
                    <p className="font-body text-gray-700 mt-2">
                      東北大学マクロ経済学教授と共同研究<br />
                      「子供の機会拡張や収入向上に有意な体験/変数の特定」
                    </p>
                  </div>
                  
                  <div className="border-l-2 border-gray-200 pl-4 ml-4 relative">
                    <div className="absolute w-3 h-3 rounded-full bg-gray-200 -left-[6.5px] top-1.5"></div>
                    <h4 className="font-heading text-md font-subheading">2025年 - 予定</h4>
                    <p className="font-body text-gray-700 mt-2">
                      研究成果の実装と効果検証<br />
                      地域教育委員会との連携プロジェクト開始
                    </p>
                  </div>
                </div>
                
                {/* Optional paper link */}
                <div className="mt-8 pt-4 border-t border-dashed border-gray-200">
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    <FileSearch className="h-4 w-4 mr-2" />
                    <span>論文・研究成果（準備中）</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* 6. Partners Section */}
        <section className="py-16 sm:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className={`font-heading ${isMobile ? "text-2xl" : "text-3xl"} font-subheading text-center mb-12`}>連携・パートナー</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 aspect-video">
                <div className="text-center font-heading text-gray-700">東北大学</div>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 aspect-video">
                <div className="text-center font-heading text-gray-700">京都市</div>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-lg p-4 aspect-video">
                <div className="text-center font-heading text-gray-700">Kita Villa Papillon (ドイツ)</div>
              </div>
            </div>
            
            <p className="mt-8 text-center text-sm text-gray-500 font-body">
              その他多数の教育機関・企業と連携しています
            </p>
          </div>
        </section>

        {/* 7. Contact CTA */}
        <section className="py-16 sm:py-24 bg-gradient-to-b from-[#FFF8E1] to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
                一緒に次のチャンスを<br className={isMobile ? "" : "hidden"} />
                つくりませんか？
              </h2>
              <p className="font-body text-gray-700 mb-8 max-w-lg mx-auto">
                私たちと一緒に、未来を担う子どもたちの可能性を広げる活動に参加しませんか？
                お気軽にお問い合わせください。
              </p>
              <a 
                href="mailto:satoyoshi.kaho@outlook.jp"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-heading hover:bg-primary/90 transition-colors"
              >
                <Mail className="h-5 w-5" />
                メールで問い合わせ
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyPage;
