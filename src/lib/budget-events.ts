// types.ts
// イベントの種類を拡張
export type EventType = "expense" | "income" | "choice" | "quiz";

// イベントの型定義
export interface BudgetEvent {
  id: number;
  day: number;
  title: string;
  description: string;
  type: EventType;
  options?: {
    text: string;
    cost: number;
    reward: number;
    happiness: number;
    consequence: string;
    badge?: string;
  }[];
}

// 全ての予算イベントを取得
export const getBudgetEvents = (): BudgetEvent[] => {
  return [
    {
      id: 1,
      day: 3,
      title: "友人からの食事の誘い",
      description: "仕事帰り、友人から「新しくオープンしたレストランに行こう」と誘われました。",
      type: "choice",
      options: [
        {
          text: "行く（予算3,000円）",
          cost: 3000,
          reward: 0,
          happiness: 5,
          consequence: "美味しい料理と会話を楽しみました。満足度が上がりました。"
        },
        {
          text: "丁重に断り家で自炊する",
          cost: 500,
          reward: 0,
          happiness: -2,
          consequence: "節約のため自炊しました。少し寂しいですが、2,500円節約できました。"
        },
        {
          text: "より安いカフェに誘いなおす",
          cost: 1200,
          reward: 0,
          happiness: 2,
          consequence: "予算に合わせた場所に変更し、友人との時間も楽しめました。"
        }
      ]
    },
    {
      id: 2,
      day: 5,
      title: "スマホが壊れた！",
      description: "突然スマホが起動しなくなりました。修理か買い替えが必要です。",
      type: "choice",
      options: [
        {
          text: "新機種に買い替える",
          cost: 50000,
          reward: 0,
          happiness: 7,
          consequence: "最新機種を購入しました。かなり出費しましたが長期的には投資と考えられます。"
        },
        {
          text: "修理に出す（1週間使えない）",
          cost: 15000,
          reward: 0,
          happiness: -5,
          consequence: "修理に出しました。不便な1週間ですが、大きな出費は避けられました。"
        },
        {
          text: "中古の機種を購入する",
          cost: 20000,
          reward: 0,
          happiness: 2,
          consequence: "中古市場で良いコンディションの機種を見つけました。賢い選択です。"
        }
      ]
    },
    {
      id: 3,
      day: 8,
      title: "副業のチャンス",
      description: "週末に短期アルバイトの募集を見つけました。参加しますか？",
      type: "choice",
      options: [
        {
          text: "参加する（休日を犠牲に）",
          cost: 0,
          reward: 8000,
          happiness: -3,
          consequence: "休日を使って働き、8,000円の収入を得ました。少し疲れましたが、財布は潤いました。"
        },
        {
          text: "見送る（休息優先）",
          cost: 0,
          reward: 0,
          happiness: 3,
          consequence: "休息を選びました。お金は得られませんでしたが、心身の回復ができました。"
        }
      ]
    },
    {
      id: 4,
      day: 12,
      title: "突然の医療費",
      description: "体調を崩し、病院に行く必要があります。",
      type: "expense",
      options: [
        {
          text: "病院に行く",
          cost: 5000,
          reward: 0,
          happiness: -2,
          consequence: "診察と薬で5,000円かかりましたが、早めの治療で悪化を防ぎました。"
        },
        {
          text: "市販薬で様子を見る",
          cost: 1500,
          reward: 0,
          happiness: -5,
          consequence: "市販薬を購入しましたが、完全な回復には時間がかかりそうです。"
        }
      ]
    },
    {
      id: 5,
      day: 15,
      title: "家電セール",
      description: "欲しかった家電が大幅値引きされています。",
      type: "choice",
      options: [
        {
          text: "今買う（特別価格）",
          cost: 12000,
          reward: 0,
          happiness: 6,
          consequence: "セールで良い商品を手に入れました。満足感があります。"
        },
        {
          text: "我慢して見送る",
          cost: 0,
          reward: 0,
          happiness: -2,
          consequence: "欲しかったものを我慢しました。少し残念ですが、家計は助かります。"
        }
      ]
    },
    {
      id: 6,
      day: 18,
      title: "友人の結婚祝い",
      description: "仲の良い友人の結婚祝いを準備する必要があります。",
      type: "expense",
      options: [
        {
          text: "少し奮発して良いギフトを",
          cost: 10000,
          reward: 0,
          happiness: 4,
          consequence: "心のこもったギフトを購入しました。友人も喜んでくれるでしょう。"
        },
        {
          text: "予算内で手頃なギフトを",
          cost: 5000,
          reward: 0,
          happiness: 2,
          consequence: "予算に合わせたギフトを選びました。センスで勝負です。"
        },
        {
          text: "手作りギフトで気持ちを伝える",
          cost: 2000,
          reward: 0,
          happiness: 5,
          consequence: "時間はかかりましたが、心のこもった手作りギフトに友人は感動していました！",
          badge: "クリエイティブ節約家"
        }
      ]
    },
    {
      id: 7,
      day: 21,
      title: "光熱費の請求",
      description: "今月の電気・ガス・水道の請求が来ました。",
      type: "expense",
      options: [
        {
          text: "通常通り支払う",
          cost: 12000,
          reward: 0,
          happiness: 0,
          consequence: "毎月の固定費として支払いました。"
        },
        {
          text: "節約対策を施して支払う",
          cost: 9000,
          reward: 0,
          happiness: -1,
          consequence: "少し不便ですが、節電・節水で3,000円浮かせました。",
          badge: "エコ節約マスター"
        }
      ]
    },
    {
      id: 8,
      day: 25,
      title: "月末の特売セール",
      description: "スーパーで日用品の特売セールを発見しました。",
      type: "choice",
      options: [
        {
          text: "必要なものだけ買う",
          cost: 3000,
          reward: 0,
          happiness: 0,
          consequence: "必要な分だけ購入しました。計画的な買い物です。"
        },
        {
          text: "まとめ買いしておく",
          cost: 8000,
          reward: 0,
          happiness: 2,
          consequence: "少し多めに買い込みました。長期的には節約になるかもしれません。"
        }
      ]
    },
    {
      id: 9,
      day: 28,
      title: "臨時ボーナス",
      description: "仕事で評価され、臨時ボーナスをもらいました！",
      type: "income",
      options: [
        {
          text: "全額貯金する",
          cost: 0,
          reward: 20000,
          happiness: 5,
          consequence: "将来のために全額を貯金しました。安心感が増しました。",
          badge: "賢明な投資家"
        },
        {
          text: "半分は自分へのご褒美に使う",
          cost: 10000,
          reward: 20000,
          happiness: 8,
          consequence: "頑張った自分へのご褒美と、将来への備えのバランスを取りました。"
        }
      ]
    }
    // 他のイベントも追加可能
  ];
}

// 特定の日のイベントを取得する関数
export const getEventForDay = (day: number): BudgetEvent | undefined => {
  const events = getBudgetEvents();
  return events.find(event => event.day === day);
}

// 済んだイベントを取得する関数
export const getCompletedEvents = (completedIds: number[]): BudgetEvent[] => {
  const events = getBudgetEvents();
  return events.filter(event => completedIds.includes(event.id));
}
