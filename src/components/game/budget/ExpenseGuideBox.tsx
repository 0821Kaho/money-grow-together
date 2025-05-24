
import MascotImage from "@/components/mascot/MascotImage";

const ExpenseGuideBox = () => {
  return (
    <aside className="relative mt-4 mb-6 rounded-lg bg-pink-50 px-4 py-4 pt-5 text-sm text-brown-700 leading-relaxed border-2 border-pink-100">
      <div className="absolute -top-6 -left-4">
        <MascotImage variant="happy" size="small" mood="wink" />
      </div>
      <p className="font-bold">🐷💭「ここにある例はあくまで <u>サンプル</u>。全部あなた専用のお財布に入れ替えてね！」</p>
      <ol className="mt-2 space-y-1 list-decimal list-inside">
        <li><b>いらない行はバツ印でポイ♪</b> — 右端の <span className="inline-block bg-gray-200 rounded px-1">×</span> をタップして削除</li>
        <li><b>自分だけの項目を作る</b> — 項目名と金額を入力し <kbd className="bg-[#25B589] text-white px-2 py-0.5 rounded">＋追加</kbd></li>
        <li><b>収入も同じ手順で登録</b> — 給料、副業、フリマ売上など</li>
        <li><b>計算バーをチェック</b> — 緑＝黒字、赤＝要注意！ Pigipeが汗をかいちゃう</li>
        <li><b>最後に <kbd className="bg-game-primary text-white px-2 py-0.5 rounded">収支を確定する</kbd> ボタン</li>
      </ol>
      <footer className="mt-2 text-xs text-brown-500">※あとから何度でも編集できます</footer>
    </aside>
  );
};

export default ExpenseGuideBox;
