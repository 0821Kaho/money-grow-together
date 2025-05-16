
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const CompanyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-bold text-[#333333]">Pigipe</h1>
          </Link>
          <Link to="/" className="ml-auto flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>トップへ戻る</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm mb-16">
          <h1 className="text-2xl font-heading font-bold mb-6">会社概要</h1>
          
          <section className="mb-8">
            <h2 id="company" className="text-xl font-heading font-subheading mb-3">会社情報</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 pb-2">
                <div className="font-medium text-gray-700">会社名</div>
                <div className="md:col-span-2">NextGens株式会社（NextGens Inc.）</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 pb-2">
                <div className="font-medium text-gray-700">本社所在地</div>
                <div className="md:col-span-2">〒176-0004 東京都練馬区北町2-29-10</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 pb-2">
                <div className="font-medium text-gray-700">営業所</div>
                <div className="md:col-span-2">〒150-0001 東京都渋谷区神宮前6-23-4 桑野ビル2F</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 pb-2">
                <div className="font-medium text-gray-700">電話番号</div>
                <div className="md:col-span-2">03-6750-7041</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 pb-2">
                <div className="font-medium text-gray-700">メールアドレス</div>
                <div className="md:col-span-2">kaho.satoyoshi@outlook.jp</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 pb-2">
                <div className="font-medium text-gray-700">資本金</div>
                <div className="md:col-span-2">400万円</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 pb-2">
                <div className="font-medium text-gray-700">設立</div>
                <div className="md:col-span-2">2024年3月</div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 id="business" className="text-xl font-heading font-subheading mb-3">事業内容</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>K-12向けエデュテインメント × FinTechアプリ「Pigipe」の開発・運営</li>
              <li>金融リテラシー教育コンテンツの企画・制作</li>
              <li>教育機関向けパートナーシップ・プログラムの提供</li>
              <li>マーケティング・PRサービスの提供</li>
              <li>海外セールスサポート</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 id="research" className="text-xl font-heading font-subheading mb-3">研究開発</h2>
            <p className="mb-4">当社は、東北大学マクロ経済学教授との共同研究を通じて、最新の行動経済学に基づいた金融教育プログラムの開発を行っています。この取り組みにより、遊びながら効果的に金融リテラシーを身につける革新的なアプローチを追求しています。</p>
          </section>

          <section className="mb-8">
            <h2 id="mission" className="text-xl font-heading font-subheading mb-3">ミッション</h2>
            <p className="mb-4">「金融教育を楽しく、身近に」をミッションに掲げ、誰もが金融リテラシーを無理なく身につけられる社会の実現を目指しています。特に若年層に焦点を当て、早期からの金融教育を通じて将来の経済的自立をサポートします。</p>
          </section>

          <section className="mb-8">
            <h2 id="contact" className="text-xl font-heading font-subheading mb-3">お問い合わせ</h2>
            <p className="mb-4">当社へのお問い合わせは、下記連絡先までお願いいたします。</p>
            <p className="mb-4">
              電話：03-6750-7041（平日 10:00-18:00）<br />
              メール：kaho.satoyoshi@outlook.jp
            </p>
            <p>お問い合わせの内容によっては、回答にお時間をいただく場合がございます。あらかじめご了承ください。</p>
          </section>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-[#333333] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-heading font-bold">Pigipe</h3>
              </div>
              <p className="text-sm text-gray-400 mt-1">遊んで学べるお金アプリ</p>
            </div>
            <div className="flex gap-6">
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                利用規約
              </Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                プライバシーポリシー
              </Link>
              <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                会社概要
              </Link>
              <Link to="/impact" className="text-sm text-gray-400 hover:text-white transition-colors">
                社会インパクト
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

export default CompanyPage;
