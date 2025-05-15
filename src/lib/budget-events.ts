
interface EventOption {
  text: string;
  cost: number;
  reward: number;
  happiness: number;
  consequence: string;
  badge?: string;
}

interface BudgetEvent {
  id: number;
  day: number;
  title: string;
  description: string;
  options: EventOption[];
}

// 家計管理のイベントデータ
const budgetEvents: BudgetEvent[] = [
  {
    id: 1,
    day: 3,
    title: "友達からの誘い",
    description: "友達から居酒屋での食事に誘われました。どうしますか？",
    options: [
      {
        text: "行く（5000円）",
        cost: 5000,
        reward: 0,
        happiness: 10,
        consequence: "楽しい時間を過ごしました！しかし出費がかさみました。",
      },
      {
        text: "断る（0円）",
        cost: 0,
        reward: 0,
        happiness: -5,
        consequence: "お金は節約できましたが、少し寂しい気持ちになりました。",
      },
      {
        text: "安い居酒屋に変更提案（2500円）",
        cost: 2500,
        reward: 0,
        happiness: 8,
        consequence: "予算内で楽しめる方法を見つけました！これぞスマートな節約！",
        badge: "節約の達人",
      },
    ],
  },
  {
    id: 2,
    day: 5,
    title: "突然のスマホ故障",
    description: "使っているスマホが急に故障してしまいました。どうしますか？",
    options: [
      {
        text: "新品を購入（80000円）",
        cost: 80000,
        reward: 0,
        happiness: 15,
        consequence: "最新型のスマホを手に入れました！しかし大きな出費に…",
      },
      {
        text: "修理する（20000円）",
        cost: 20000,
        reward: 0,
        happiness: 5,
        consequence: "修理して使い続けることにしました。賢い選択です！",
        badge: "賢い消費者",
      },
      {
        text: "中古購入（30000円）",
        cost: 30000,
        reward: 0,
        happiness: 8,
        consequence: "中古のスマホを購入しました。バランスの取れた選択です。",
      },
    ],
  },
  {
    id: 3,
    day: 8,
    title: "残業の機会",
    description: "上司から残業を頼まれました。週末の予定はありません。",
    options: [
      {
        text: "引き受ける（+12000円）",
        cost: 0,
        reward: 12000,
        happiness: -3,
        consequence: "少し疲れましたが、収入が増えました！",
      },
      {
        text: "断る（0円）",
        cost: 0,
        reward: 0,
        happiness: 5,
        consequence: "休日を満喫できましたが、追加収入のチャンスを逃しました。",
      },
    ],
  },
  {
    id: 4,
    day: 12,
    title: "飲み会の会費",
    description: "会社の飲み会があります。参加費は5000円です。",
    options: [
      {
        text: "参加する（5000円）",
        cost: 5000,
        reward: 0,
        happiness: 5,
        consequence: "人脈を広げることができました。将来の仕事にも役立つかも。",
      },
      {
        text: "欠席する（0円）",
        cost: 0,
        reward: 0,
        happiness: 0,
        consequence: "お金は節約できましたが、人間関係への投資も大切かもしれません。",
      },
    ],
  },
  {
    id: 5,
    day: 15,
    title: "友人の結婚式",
    description: "親しい友人から結婚式の招待状が届きました。ご祝儀を準備する必要があります。",
    options: [
      {
        text: "出席する（30000円）",
        cost: 30000,
        reward: 0,
        happiness: 10,
        consequence: "友人の幸せな姿を見ることができ、とても良い時間を過ごしました。",
      },
      {
        text: "欠席してお祝いだけ送る（10000円）",
        cost: 10000,
        reward: 0,
        happiness: -5,
        consequence: "残念でしたが、予算を考慮した決断でした。",
        badge: "賢い予算管理",
      },
    ],
  },
  {
    id: 6,
    day: 18,
    title: "副業のチャンス",
    description: "週末だけのアルバイトを見つけました。引き受けますか？",
    options: [
      {
        text: "引き受ける（+15000円）",
        cost: 0,
        reward: 15000,
        happiness: -5,
        consequence: "週末は忙しくなりましたが、良い収入になりました！",
        badge: "副収入マスター",
      },
      {
        text: "断る（0円）",
        cost: 0,
        reward: 0,
        happiness: 5,
        consequence: "ゆっくり休むことができました。時々は休息も大切です。",
      },
    ],
  },
  {
    id: 7,
    day: 22,
    title: "セール情報",
    description: "欲しかった商品が大幅値引きセール中です！買いますか？",
    options: [
      {
        text: "今すぐ買う（15000円）",
        cost: 15000,
        reward: 0,
        happiness: 15,
        consequence: "長く欲しかった商品をお得に手に入れました！",
      },
      {
        text: "我慢する（0円）",
        cost: 0,
        reward: 0,
        happiness: -8,
        consequence: "欲しいものを我慢するのは大変ですが、必要なものかどうか考える良い機会になりました。",
        badge: "衝動買い防止",
      },
    ],
  },
  {
    id: 8,
    day: 26,
    title: "家族の誕生日",
    description: "家族の誕生日が近づいています。どうしますか？",
    options: [
      {
        text: "レストランでお祝い（20000円）",
        cost: 20000,
        reward: 0,
        happiness: 12,
        consequence: "素敵な時間を過ごし、良い思い出になりました。",
      },
      {
        text: "手作りケーキと手作り料理（5000円）",
        cost: 5000,
        reward: 0,
        happiness: 15,
        consequence: "予算内で心のこもったお祝いができました！家族も喜んでくれました。",
        badge: "創意工夫の達人",
      },
      {
        text: "カードだけ渡す（1000円）",
        cost: 1000,
        reward: 0,
        happiness: -3,
        consequence: "最低限のお祝いはできましたが、少し寂しい気持ちになりました。",
      },
    ],
  },
  {
    id: 9,
    day: 29,
    title: "月末の電気代",
    description: "電気代の請求が予想より高額でした。",
    options: [
      {
        text: "今月分をすべて支払う（12000円）",
        cost: 12000,
        reward: 0,
        happiness: 0,
        consequence: "きちんと支払いを済ませ、安心しました。",
      },
      {
        text: "分割払いを選択（今月6000円）",
        cost: 6000,
        reward: 0,
        happiness: -3,
        consequence: "今月の負担は減りましたが、来月の支払いが増えます。",
      },
    ],
  },
];

// 特定の日のイベントを取得する関数
export function getEventForDay(day: number): BudgetEvent | null {
  return budgetEvents.find(event => event.day === day) || null;
}

// すべてのイベントを取得する関数
export function getBudgetEvents(): BudgetEvent[] {
  return budgetEvents;
}
