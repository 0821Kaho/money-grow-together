
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const TermsPage = () => {
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
          <h1 className="text-2xl font-heading font-bold mb-6">利用規約</h1>
          
          <section className="mb-8">
            <h2 id="intro" className="text-xl font-heading font-subheading mb-3">1. はじめに</h2>
            <p className="mb-4">本利用規約（以下「本規約」といいます。）は、株式会社NextGens（以下「当社」）が提供する金融教育エデュテイメントアプリ「Pigipe」（以下「本サービス」）の利用条件を定めるものです。ユーザーは、本規約に同意したうえで本サービスを利用するものとします。</p>
          </section>

          <section className="mb-8">
            <h2 id="definitions" className="text-xl font-heading font-subheading mb-3">2. 定義</h2>
            <p className="mb-4">本規約において使用する用語の定義は以下のとおりとします。</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>「ユーザー」とは、本サービスを利用する全ての方を指します。</li>
              <li>「コンテンツ」とは、本サービス上で提供される全ての情報、テキスト、画像、動画、音声等のデータを指します。</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 id="services" className="text-xl font-heading font-subheading mb-3">3. 本サービスの内容</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>本サービスは金融リテラシー向上を目的とした学習モジュールを無償で提供します。</li>
              <li>本サービスはあくまで情報提供を目的としており、投資勧誘または金融商品の販売を目的とするものではありません。</li>
              <li>当社は必要に応じて本サービスの全部または一部を変更・追加・廃止できます。</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 id="registration" className="text-xl font-heading font-subheading mb-3">4. 利用登録</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>本サービスの一部機能は、登録が必要となる場合があります。</li>
              <li>登録の際には正確かつ最新の情報を提供していただきます。</li>
              <li>当社は、利用登録の申請を承認しない場合があり、その理由について一切開示義務を負いません。</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 id="prohibited" className="text-xl font-heading font-subheading mb-3">5. ユーザー責任・禁止事項</h2>
            <p className="mb-4">ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>本サービスで提供されるコンテンツを無断で複製・転載・販売する行為</li>
              <li>不正アクセス、脆弱性調査、改ざん行為</li>
              <li>反社会的勢力への利益供与</li>
              <li>他のユーザーや第三者に不利益を与える行為</li>
              <li>法令または公序良俗に反する行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 id="disclaimer" className="text-xl font-heading font-subheading mb-3">6. 免責事項</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>当社は、本サービスの内容およびユーザーが得る情報について、その完全性・正確性・有用性等を保証しません。</li>
              <li>ユーザーが本サービスを利用して行った投資・金銭判断は、自己責任で行うものとします。</li>
              <li>当社は、直接または間接に生じた損害について一切の責任を負いません。</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 id="copyright" className="text-xl font-heading font-subheading mb-3">7. 著作権・知的財産権</h2>
            <p className="mb-4">本サービスに関する著作権、商標権、その他の知的財産権は、当社または正当な権利者に帰属します。ユーザーは、当社の許可なく本サービスのコンテンツを複製、転用、販売等の行為を行うことはできません。</p>
          </section>

          <section className="mb-8">
            <h2 id="privacy" className="text-xl font-heading font-subheading mb-3">8. プライバシー</h2>
            <p className="mb-4">当社のプライバシーポリシーは、本規約の一部を構成します。個人情報の取り扱いについては、<Link to="/privacy" className="text-primary hover:underline">プライバシーポリシー</Link>をご確認ください。</p>
          </section>

          <section className="mb-8">
            <h2 id="changes" className="text-xl font-heading font-subheading mb-3">9. サービスの変更・終了</h2>
            <p className="mb-4">当社は、ユーザーに事前に通知することなく、本サービスの内容を変更、または提供を中止することができるものとします。当社は、これによってユーザーに生じた損害について一切の責任を負いません。</p>
          </section>

          <section className="mb-8">
            <h2 id="law" className="text-xl font-heading font-subheading mb-3">10. 準拠法・裁判管轄</h2>
            <p className="mb-4">本規約は日本法を準拠法とし、本サービスに関連して生じる紛争については、仙台地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
          </section>

          <section className="mb-8">
            <h2 id="contact" className="text-xl font-heading font-subheading mb-3">11. お問い合わせ</h2>
            <p className="mb-4">本サービスに関するお問い合わせは、下記までご連絡ください。</p>
            <p className="mb-4">
              社名: 株式会社NextGens<br />
              電話番号: 03-6750-7041<br />
              メールアドレス: satoyoshi.kaho@outlook.jp
            </p>
          </section>

          <div className="text-right text-sm text-gray-500">
            <p>最終更新日: 2025年5月17日</p>
          </div>
        </div>
      </main>
      
      {/* Footer removed from here as it's now in App.tsx */}
    </div>
  );
};

export default TermsPage;
