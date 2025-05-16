
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const PrivacyPolicyPage = () => {
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
          <h1 className="text-2xl font-heading font-bold mb-6">プライバシーポリシー</h1>
          
          <section className="mb-8">
            <h2 id="intro" className="text-xl font-heading font-subheading mb-3">1. はじめに</h2>
            <p className="mb-4">NextGens株式会社（以下「当社」）は、Pigipe（以下「本サービス」）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。</p>
          </section>

          <section className="mb-8">
            <h2 id="collection" className="text-xl font-heading font-subheading mb-3">2. 取得する情報</h2>
            <p className="mb-4">当社は、本サービスの提供にあたり、以下の情報を取得します。</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>メールアドレス、ニックネーム等の登録情報</li>
              <li>学習進捗、達成状況等のサービス利用データ</li>
              <li>デバイス情報、IPアドレス、ブラウザ情報</li>
              <li>ログイン履歴、アクセスログ等の利用ログ</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 id="purpose" className="text-xl font-heading font-subheading mb-3">3. 利用目的</h2>
            <p className="mb-4">取得した個人情報は、以下の目的で利用します。</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>本サービスの提供・維持・改善</li>
              <li>ユーザーサポート、お問い合わせ対応</li>
              <li>新機能・更新情報の通知</li>
              <li>利用状況の分析・統計情報の作成（個人を特定しない形式）</li>
              <li>不正アクセスの防止、セキュリティ確保</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 id="thirdparty" className="text-xl font-heading font-subheading mb-3">4. 第三者提供／外部サービス</h2>
            <p className="mb-4">当社は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>ユーザーの同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要な場合</li>
              <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
            </ul>
            <p className="mt-4">本サービスでは、以下の外部サービスを利用しています。</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>AWS（サーバー・データベース）</li>
              <li>Google Analytics（アクセス解析）</li>
              <li>Firebase（認証・データベース）</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 id="cookie" className="text-xl font-heading font-subheading mb-3">5. Cookie／解析ツール</h2>
            <p className="mb-4">当社は、ユーザーのサービス利用状況を把握するために、Cookieやローカルストレージを使用することがあります。ユーザーはブラウザの設定からCookieの受け入れを拒否することができますが、一部の機能が利用できなくなる可能性があります。</p>
            <p className="mb-4">また、本サービスでは、Google Analyticsを利用してアクセス解析を行っています。Google Analyticsは、Cookieを使用してユーザーの利用データを収集します。これらのデータは匿名で収集されており、個人を特定するものではありません。</p>
          </section>

          <section className="mb-8">
            <h2 id="security" className="text-xl font-heading font-subheading mb-3">6. セキュリティ</h2>
            <p className="mb-4">当社は、個人情報の漏洩、滅失、毀損等を防止するために、以下のセキュリティ対策を講じています。</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSL/TLS（TLS 1.2以上）による通信の暗号化</li>
              <li>AES-256による保管データの暗号化</li>
              <li>アクセス権限の適切な管理</li>
              <li>定期的なセキュリティ監査の実施</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 id="rights" className="text-xl font-heading font-subheading mb-3">7. ユーザーの権利</h2>
            <p className="mb-4">ユーザーは、当社に対して、自己の個人情報の開示、訂正、削除、利用停止を求めることができます。これらの請求があった場合、当社は本人確認を行った上で、30日以内に対応します。</p>
          </section>

          <section className="mb-8">
            <h2 id="children" className="text-xl font-heading font-subheading mb-3">8. 未成年の利用</h2>
            <p className="mb-4">本サービスは、13歳未満の方の利用を想定していません。13歳以上18歳未満の未成年者が本サービスを利用する場合は、保護者の同意を得る必要があります。</p>
          </section>

          <section className="mb-8">
            <h2 id="update" className="text-xl font-heading font-subheading mb-3">9. 改定</h2>
            <p className="mb-4">当社は、必要に応じて本ポリシーを変更することがあります。変更した場合は、本ページ上で通知します。</p>
          </section>

          <section className="mb-8">
            <h2 id="contact" className="text-xl font-heading font-subheading mb-3">10. お問い合わせ</h2>
            <p className="mb-4">本ポリシーに関するお問い合わせは、下記までご連絡ください。</p>
            <p className="mb-4">
              NextGens株式会社（NextGens Inc.）<br />
              本社：〒176-0004 東京都練馬区北町2-29-10<br />
              営業所：〒150-0001 東京都渋谷区神宮前6-23-4 桑野ビル2F<br />
              電話：03-6750-7041<br />
              メール：kaho.satoyoshi@outlook.jp
            </p>
          </section>

          <div className="text-right text-sm text-gray-500">
            <p>最終更新日: 2025年5月17日</p>
          </div>
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

export default PrivacyPolicyPage;
