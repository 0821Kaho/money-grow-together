// 予算シミュレーションのイベントを取得する
export const getBudgetEvents = () => {
  const events = [
    {
      id: 1,
      day: 2,
      title: "友人からのお誘い",
      description: "友人から週末に映画に行かないかと誘われました。",
      options: [
        {
          text: "映画を見に行く（映画館で鑑賞）",
          cost: 2000,
          reward: 0,
          happiness: 5,
          consequence: "楽しい時間を過ごすことができました。"
        },
        {
          text: "家で動画配信サービスを見る提案をする",
          cost: 0,
          reward: 0,
          happiness: 3,
          consequence: "友人を家に呼んで一緒に映画を楽しみました。お金を節約できました。"
        },
        {
          text: "今回は断る",
          cost: 0,
          reward: 0,
          happiness: -2,
          consequence: "お金は節約できましたが、少し残念な気持ちになりました。"
        }
      ]
    },
    {
      id: 2,
      day: 4,
      title: "スマホの料金プラン",
      description: "スマホの料金プランを見直す時期になりました。",
      options: [
        {
          text: "大容量プラン（高速通信無制限）を継続",
          cost: 7000,
          reward: 0,
          happiness: 2,
          consequence: "快適なネット環境を維持できています。"
        },
        {
          text: "中容量プランに変更する",
          cost: 4000,
          reward: 0,
          happiness: 0,
          consequence: "ほとんど不便なく使えていて、料金も抑えられています。"
        },
        {
          text: "最小容量プランに変更する",
          cost: 2000,
          reward: 0,
          happiness: -3,
          badge: "節約の達人",
          consequence: "動画視聴に制限がかかり少し不便ですが、大幅に料金を抑えることができました。"
        }
      ]
    },
    {
      id: 3,
      day: 6,
      title: "急な出費",
      description: "スマホが故障してしまいました。修理か買い替えが必要です。",
      options: [
        {
          text: "修理に出す（画面のみの修理）",
          cost: 15000,
          reward: 0,
          happiness: 0,
          consequence: "修理で直りましたが、修理費が予想以上にかかりました。"
        },
        {
          text: "新しいスマホを購入する",
          cost: 80000,
          reward: 0,
          happiness: 10,
          consequence: "最新モデルを手に入れて大満足ですが、予算が大幅に減りました。"
        },
        {
          text: "中古のスマホを購入する",
          cost: 30000,
          reward: 0,
          happiness: 5,
          badge: "賢い消費者",
          consequence: "適切な価格で必要な機能を備えたスマホを手に入れました。"
        }
      ]
    },
    {
      id: 4,
      day: 8,
      title: "副業の機会",
      description: "週末にアルバイトの募集を見つけました。",
      options: [
        {
          text: "週末を使ってアルバイトをする",
          cost: 0,
          reward: 12000,
          happiness: -3,
          badge: "副収入ゲッター",
          consequence: "少し疲れましたが、追加の収入を得ることができました。"
        },
        {
          text: "オンラインでできる副業を探す",
          cost: 0,
          reward: 5000,
          happiness: 0,
          consequence: "自宅で気軽に作業でき、少額ですが収入を得られました。"
        },
        {
          text: "休日を優先して断る",
          cost: 0,
          reward: 0,
          happiness: 5,
          consequence: "ゆっくり休むことで心身ともにリフレッシュできました。"
        }
      ]
    },
    {
      id: 5,
      day: 11,
      title: "友人の誕生日",
      description: "親しい友人の誕生日が近づいています。",
      options: [
        {
          text: "レストランでお祝いする",
          cost: 6000,
          reward: 0,
          happiness: 8,
          consequence: "友人も喜び、楽しいひとときを過ごしました。"
        },
        {
          text: "手作りの料理でホームパーティー",
          cost: 3000,
          reward: 0,
          happiness: 10,
          badge: "心のこもった贈り物",
          consequence: "手間はかかりましたが、友人に大変喜ばれました。"
        },
        {
          text: "メッセージカードを送る",
          cost: 500,
          reward: 0,
          happiness: 2,
          consequence: "お金はかけずに済みましたが、少し物足りない気持ちになりました。"
        }
      ]
    },
    {
      id: 6,
      day: 15,
      title: "セール情報",
      description: "欲しかった商品が大幅値下げセール中です。",
      options: [
        {
          text: "セールを利用して今すぐ購入する",
          cost: 20000,
          reward: 0,
          happiness: 15,
          consequence: "お得に手に入れられて満足感でいっぱいです。"
        },
        {
          text: "本当に必要か考え直して見送る",
          cost: 0,
          reward: 0,
          happiness: -5,
          badge: "誘惑に勝った強者",
          consequence: "欲しい気持ちを抑えつつも、計画外の出費を避けられました。"
        },
        {
          text: "もう少し価格が下がるか様子を見る",
          cost: 0,
          reward: 0,
          happiness: -2,
          consequence: "今はセールを見送りましたが、もっと値下がりするかもしれません。"
        }
      ]
    },
    {
      id: 7,
      day: 18,
      title: "光熱費の節約方法",
      description: "先月の光熱費が予想以上に高くなっていました。",
      options: [
        {
          text: "LED電球に交換する",
          cost: 8000,
          reward: 0,
          happiness: 0,
          badge: "長期的視点の持ち主",
          consequence: "初期費用はかかりましたが、長期的に節約できそうです。"
        },
        {
          text: "こまめに電源を切るよう心がける",
          cost: 0,
          reward: 1000,
          happiness: -1,
          consequence: "少し不便ですが、コストをかけずに節約できています。"
        },
        {
          text: "特に何もしない",
          cost: 2000,
          reward: 0,
          happiness: 0,
          consequence: "特に対策をしなかったため、光熱費は高いままです。"
        }
      ]
    },
    {
      id: 8,
      day: 21,
      title: "健康への投資",
      description: "最近、健康のことが気になっています。",
      options: [
        {
          text: "ジムに入会する",
          cost: 10000,
          reward: 0,
          happiness: 7,
          consequence: "入会金はかかりましたが、定期的に運動できる環境が整いました。"
        },
        {
          text: "自宅でできる運動を始める",
          cost: 0,
          reward: 0,
          happiness: 5,
          badge: "健康的な生活習慣",
          consequence: "お金をかけずに健康的な習慣を始められました。"
        },
        {
          text: "健康食品を購入する",
          cost: 5000,
          reward: 0,
          happiness: 2,
          consequence: "効果はまだ実感できていませんが、健康への一歩を踏み出しました。"
        }
      ]
    },
    {
      id: 9,
      day: 24,
      title: "食費の見直し",
      description: "毎日の食事代がかさんでいることに気づきました。",
      options: [
        {
          text: "自炊を増やす計画を立てる",
          cost: 2000,
          reward: 5000,
          happiness: 3,
          badge: "料理マスター見習い",
          consequence: "少し時間はかかりますが、健康的で経済的な食生活になりました。"
        },
        {
          text: "安いお店や特売日を狙う",
          cost: 0,
          reward: 3000,
          happiness: 1,
          consequence: "外食は続けつつも、賢く節約することができました。"
        },
        {
          text: "現状維持で特に対策しない",
          cost: 3000,
          reward: 0,
          happiness: 0,
          consequence: "便利さを優先して、特に食費は削減しませんでした。"
        }
      ]
    },
    {
      id: 10,
      day: 27,
      title: "臨時ボーナス",
      description: "仕事で良い評価をもらい、臨時ボーナスが入りました。",
      options: [
        {
          text: "全額を貯金する",
          cost: 0,
          reward: 20000,
          happiness: 5,
          badge: "堅実な将来設計",
          consequence: "将来の安心のために貯蓄を増やすことができました。"
        },
        {
          text: "半分は貯金、半分は楽しむ",
          cost: 0,
          reward: 10000,
          happiness: 10,
          consequence: "計画的に使いながらも、自分へのご褒美も忘れませんでした。"
        },
        {
          text: "欲しかったものを思い切って購入",
          cost: 0,
          reward: 0,
          happiness: 15,
          consequence: "長く欲しかったものを手に入れて、大満足しています。"
        }
      ]
    },
    {
      id: 11,
      day: 3,
      title: "通勤方法の見直し",
      description: "毎日の通勤にかかる交通費を見直す機会がありました。",
      options: [
        {
          text: "自転車通勤に切り替える",
          cost: 30000,
          reward: 10000,
          happiness: 5,
          badge: "エコ通勤者",
          consequence: "初期投資はかかりましたが、健康的で長期的に節約になります。"
        },
        {
          text: "公共交通機関の定期券を購入",
          cost: 15000,
          reward: 3000,
          happiness: 2,
          consequence: "若干安くなり、読書時間も確保できて一石二鳥です。"
        },
        {
          text: "現状維持（都度払い）",
          cost: 0,
          reward: 0,
          happiness: 0,
          consequence: "特に変更はせず、従来通りの通勤を続けています。"
        }
      ]
    },
    {
      id: 12,
      day: 9,
      title: "捨てられない服",
      description: "タンスの中に着ない服が溜まっています。",
      options: [
        {
          text: "フリマアプリで売ってみる",
          cost: 0,
          reward: 15000,
          happiness: 7,
          badge: "断捨離の達人",
          consequence: "部屋がすっきりし、予想以上の金額で売れました。"
        },
        {
          text: "寄付する",
          cost: 0,
          reward: 0,
          happiness: 8,
          consequence: "誰かの役に立てることができて、心が軽くなりました。"
        },
        {
          text: "とりあえずそのまま保管",
          cost: 0,
          reward: 0,
          happiness: -2,
          consequence: "いつか着るかもしれないと思いつつ、スペースの問題は解決していません。"
        }
      ]
    },
    {
      id: 13,
      day: 12,
      title: "趣味の出費",
      description: "最近始めた趣味に関連する魅力的な商品を見つけました。",
      options: [
        {
          text: "思い切って購入する",
          cost: 20000,
          reward: 0,
          happiness: 12,
          consequence: "趣味の時間がより充実し、満足感を得られています。"
        },
        {
          text: "中古品を探してみる",
          cost: 8000,
          reward: 0,
          happiness: 8,
          badge: "賢い趣味人",
          consequence: "状態の良い中古品を見つけ、お得に趣味を充実できました。"
        },
        {
          text: "今回は購入を見送る",
          cost: 0,
          reward: 0,
          happiness: -3,
          consequence: "残念な気持ちはありますが、予算内で生活を続けられています。"
        }
      ]
    },
    {
      id: 14,
      day: 16,
      title: "友人のお金の悩み",
      description: "親しい友人がお金を貸してほしいと頼んできました。",
      options: [
        {
          text: "頼まれた金額を貸す",
          cost: 30000,
          reward: 0,
          happiness: 0,
          consequence: "友人は喜んでいますが、返してもらえるか少し心配です。"
        },
        {
          text: "少額だけ援助し、相談に乗る",
          cost: 5000,
          reward: 0,
          happiness: 3,
          badge: "思いやりのある友人",
          consequence: "友人の状況を理解しつつ、自分の範囲内でできることをしました。"
        },
        {
          text: "お金ではなく別の形で助ける方法を提案",
          cost: 0,
          reward: 0,
          happiness: 2,
          consequence: "直接お金は貸さなかったものの、友人の悩みに寄り添うことができました。"
        }
      ]
    },
    {
      id: 15,
      day: 19,
      title: "ポイント還元キャンペーン",
      description: "普段使っているクレジットカードでポイント5倍キャンペーンを実施しています。",
      options: [
        {
          text: "キャンペーンを活用して大きな買い物をする",
          cost: 50000,
          reward: 5000,
          happiness: 8,
          consequence: "ポイントを多くゲットできましたが、予算を超えた出費になりました。"
        },
        {
          text: "予定していた買い物のタイミングをずらす",
          cost: 20000,
          reward: 2000,
          happiness: 5,
          badge: "キャンペーン活用名人",
          consequence: "計画的に必要なものだけ購入し、効率良くポイントを獲得できました。"
        },
        {
          text: "特に買い物予定は変えない",
          cost: 5000,
          reward: 250,
          happiness: 0,
          consequence: "特別な出費はしませんでしたが、得られたポイントも少なめです。"
        }
      ]
    },
    {
      id: 16,
      day: 23,
      title: "水道トラブル",
      description: "自宅の水道から水漏れが発生しました。",
      options: [
        {
          text: "すぐに業者に修理を依頼",
          cost: 25000,
          reward: 0,
          happiness: 0,
          consequence: "費用はかかりましたが、迅速に問題を解決できました。"
        },
        {
          text: "修理方法を調べて自分で直してみる",
          cost: 5000,
          reward: 0,
          happiness: 7,
          badge: "DIYマスター",
          consequence: "材料費だけで済み、新たなスキルも身につきました。"
        },
        {
          text: "複数の業者から見積もりを取る",
          cost: 15000,
          reward: 0,
          happiness: 2,
          consequence: "最終的に安い業者を見つけることができ、ある程度節約できました。"
        }
      ]
    },
    {
      id: 17,
      day: 26,
      title: "投資の誘い",
      description: "友人から「必ず儲かる」という投資の話を持ちかけられました。",
      options: [
        {
          text: "友人を信じて投資してみる",
          cost: 50000,
          reward: 0,
          happiness: -15,
          consequence: "結果は期待外れで、投資金の大部分を失ってしまいました。"
        },
        {
          text: "少額だけ試してみる",
          cost: 10000,
          reward: 0,
          happiness: -5,
          consequence: "失敗しましたが、大きな損失は避けられました。"
        },
        {
          text: "きちんと調べてから判断すると断る",
          cost: 0,
          reward: 0,
          happiness: 2,
          badge: "冷静な判断力",
          consequence: "後で調べたところ、怪しい内容だったことがわかり、断って正解でした。"
        }
      ]
    },
    {
      id: 18,
      day: 14,
      title: "サブスクリプションの見直し",
      description: "毎月引き落とされる様々なサブスクリプションサービスを見直す時期です。",
      options: [
        {
          text: "すべてのサービスを継続する",
          cost: 5000,
          reward: 0,
          happiness: 5,
          consequence: "便利さは維持されていますが、毎月の固定費は変わりません。"
        },
        {
          text: "使用頻度の低いものを解約する",
          cost: 0,
          reward: 3000,
          happiness: 0,
          badge: "賢い固定費削減",
          consequence: "本当に必要なサービスだけを残し、無駄な支出を減らせました。"
        },
        {
          text: "家族や友人とシェアプランに変更",
          cost: 0,
          reward: 2000,
          happiness: 3,
          consequence: "サービスは引き続き利用しながら、費用を分担できるようになりました。"
        }
      ]
    },
    {
      id: 19,
      day: 29,
      title: "月末の振り返り",
      description: "今月の家計を振り返る時間です。",
      options: [
        {
          text: "家計簿アプリを活用して分析する",
          cost: 0,
          reward: 2000,
          happiness: 5,
          badge: "家計管理達人",
          consequence: "支出パターンを把握でき、来月の改善点も見つかりました。"
        },
        {
          text: "簡単なメモで大まかに確認する",
          cost: 0,
          reward: 1000,
          happiness: 2,
          consequence: "概要は把握できましたが、詳細な分析までは至っていません。"
        },
        {
          text: "特に振り返りはしない",
          cost: 0,
          reward: 0,
          happiness: -3,
          consequence: "今月の出費がどうだったか、あまり覚えていません。"
        }
      ]
    },
    {
      id: 20,
      day: 5,
      title: "突然の誘い",
      description: "思いがけず友人から高級レストランへの誘いがありました。",
      options: [
        {
          text: "誘いに乗って行く",
          cost: 8000,
          reward: 0,
          happiness: 10,
          consequence: "予定外の出費でしたが、素晴らしい時間を過ごせました。"
        },
        {
          text: "もう少しカジュアルな店を提案する",
          cost: 3000,
          reward: 0,
          happiness: 7,
          badge: "バランス感覚の持ち主",
          consequence: "予算を考慮しつつも、友人との時間を大切にできました。"
        },
        {
          text: "今回は丁寧に断る",
          cost: 0,
          reward: 0,
          happiness: -2,
          consequence: "出費は避けられましたが、楽しい機会を逃してしまった気がします。"
        }
      ]
    },
  ];
  
  return events;
};

// ある日のイベントを取得する
export const getEventForDay = (day: number) => {
  const allEvents = getBudgetEvents();
  return allEvents.find(event => event.day === day);
};
