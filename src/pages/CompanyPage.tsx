import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";

const CompanyPage = () => {
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

      {/* Main content with improved spacing */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm mb-16">
          <h1 className="text-2xl font-heading font-bold mb-8">会社概要</h1>
          
          <div className="space-y-10">
            <section>
              <h2 id="company" className="text-xl font-heading font-subheading mb-6 flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                会社情報
              </h2>
              <div className="space-y-3 ml-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 py-3">
                  <div className="font-medium text-gray-700">会社名</div>
                  <div className="md:col-span-2">NextGens株式会社（NextGens Inc.）</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 py-3">
                  <div className="font-medium text-gray-700">本社所在地</div>
                  <div className="md:col-span-2">〒176-0004 東京都練馬区北町2-29-10</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 py-3">
                  <div className="font-medium text-gray-700">営業所</div>
                  <div className="md:col-span-2">〒150-0001 東京都渋谷区神宮前6-23-4 桑野ビル2F</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 py-3">
                  <div className="font-medium text-gray-700">電話番号</div>
                  <div className="md:col-span-2">03-6750-7041</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 py-3">
                  <div className="font-medium text-gray-700">メールアドレス</div>
                  <div className="md:col-span-2">satoyoshi.kaho@outlook.jp</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 py-3">
                  <div className="font-medium text-gray-700">資本金</div>
                  <div className="md:col-span-2">400万円</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-gray-100 py-3">
                  <div className="font-medium text-gray-700">設立</div>
                  <div className="md:col-span-2">2024年11月</div>
                </div>
              </div>
            </section>

            <section>
              <h2 id="business" className="text-xl font-heading font-subheading mb-6 flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                事業内容
              </h2>
              <ul className="list-none ml-4 space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 mr-3 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>エデュテインメント × FinTechアプリ「Pigipe」の開発・運営</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 mr-3 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>金融リテラシー教育コンテンツの企画・制作</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 mr-3 mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>マーケティング・PRサービスの提供</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 id="research" className="text-xl font-heading font-subheading mb-6 flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </span>
                研究開発
              </h2>
              <div className="bg-[#F9F9F9] rounded-lg p-6 ml-4">
                <p className="mb-4 text-gray-700">当社は、東北大学マクロ経済学教授との共同研究を通じて、最新の行動経済学に基づいた金融教育プログラムの開発を行っています。この取り組みにより、遊びながら効果的に金融リテラシーを身につける革新的なアプローチを追求しています。</p>
              </div>
            </section>

            <section>
              <h2 id="mission" className="text-xl font-heading font-subheading mb-6 flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                ミッション
              </h2>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 ml-4">
                <p className="mb-4 text-gray-700">「金融教育を楽しく、身近に」をミッションに掲げ、誰もが金融リテラシーを無理なく身につけられる社会の実現を目指しています。特に若年層に焦点を当て、早期からの金融教育を通じて将来の経済的自立をサポートします。</p>
              </div>
            </section>

            <section>
              <h2 id="contact" className="text-xl font-heading font-subheading mb-6 flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                お問い合わせ
              </h2>
              <div className="bg-[#F9F9F9] rounded-lg p-6 ml-4">
                <p className="mb-4">当社へのお問い合わせは、下記連絡先までお願いいたします。</p>
                <p className="mb-4">
                  電話：03-6750-7041（平日 10:00-18:00）<br />
                  メール：satoyoshi.kaho@outlook.jp
                </p>
                <p className="text-sm text-gray-500">お問い合わせの内容によっては、回答にお時間をいただく場合がございます。あらかじめご了承ください。</p>
              </div>
            </section>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link to="/">
              <Button className="bg-gradient-to-r from-rose-400 to-pink-300 shadow-lg hover:shadow-xl transition-all px-8 py-6 h-auto rounded-xl">
                トップページへ
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyPage;
