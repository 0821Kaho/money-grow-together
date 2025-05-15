
import GameLayout from "@/components/layout/GameLayout";

const ProfilePage = () => {
  return (
    <GameLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">あなたのプロフィール</h1>
      </div>
      
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-24 w-24 rounded-full bg-game-primary text-white flex items-center justify-center text-3xl font-bold">
            ユ
          </div>
          <h2 className="mb-1 text-xl font-bold">ユーザー</h2>
          <p className="mb-6 text-sm text-gray-600">初心者レベル</p>
          
          <div className="mb-6 w-full">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">経験値</span>
              <span className="text-sm font-medium">125 / 500</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: "25%" }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="mb-3 font-medium">獲得した実績</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="achievement-badge mb-2">
                <div className="achievement-badge-inner">
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
              <p className="text-center text-xs font-medium">予算達成</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="achievement-badge mb-2">
                <div className="achievement-badge-inner">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
              <p className="text-center text-xs font-medium">貯金スタート</p>
            </div>
            <div className="flex flex-col items-center opacity-40">
              <div className="achievement-badge mb-2 bg-gray-200">
                <div className="achievement-badge-inner">
                  <span className="text-2xl">❓</span>
                </div>
              </div>
              <p className="text-center text-xs font-medium">???</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="mb-3 font-medium">統計情報</h3>
          <div className="divide-y rounded-lg border border-gray-200">
            <div className="flex items-center justify-between p-3">
              <span className="text-sm">完了したモジュール</span>
              <span className="font-medium">1 / 5</span>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-sm">獲得したコイン</span>
              <span className="font-medium">100</span>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-sm">連続学習日数</span>
              <span className="font-medium">3日</span>
            </div>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default ProfilePage;
