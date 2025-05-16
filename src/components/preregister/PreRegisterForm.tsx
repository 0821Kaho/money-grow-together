
import { useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Countdown from 'react-countdown';
import MascotImage from '@/components/mascot/MascotImage';

type RegisterState = 'idle' | 'loading' | 'done' | 'dup' | 'error';

const PreRegisterForm = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<RegisterState>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('メールアドレスを正しく入力してください');
      return;
    }

    setState('loading');
    
    try {
      const response = await api.post('/waitlist', { email });
      
      if (response.status === 200) {
        setState('done');
        toast.success('登録ありがとうございます！');
        setEmail('');
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        setState('dup');
        toast.info('このメールアドレスは既に登録されています');
      } else {
        setState('error');
        toast.error('エラーが発生しました。もう一度お試しください');
        console.error('Registration error:', error);
      }
    }
  };

  // Countdown renderer
  const countdownRenderer = ({ days, hours, minutes, seconds }: any) => (
    <div className="flex gap-2 justify-center font-number font-bold text-xl">
      <div className="flex flex-col items-center">
        <span>{days}</span>
        <span className="text-xs text-gray-500">日</span>
      </div>
      <span className="text-gray-400">:</span>
      <div className="flex flex-col items-center">
        <span>{hours}</span>
        <span className="text-xs text-gray-500">時間</span>
      </div>
      <span className="text-gray-400">:</span>
      <div className="flex flex-col items-center">
        <span>{minutes}</span>
        <span className="text-xs text-gray-500">分</span>
      </div>
      <span className="text-gray-400">:</span>
      <div className="flex flex-col items-center">
        <span>{seconds}</span>
        <span className="text-xs text-gray-500">秒</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <Input 
          type="email" 
          required 
          placeholder="メールアドレス"
          className="w-full rounded-lg px-4 py-3 border focus:ring-pink-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={state === 'loading' || state === 'done'}
        />
        <Button 
          type="submit"
          className="w-full bg-gradient-to-r from-rose-400 to-pink-300 text-white font-number py-6 rounded-lg shadow-lg hover:opacity-95"
          disabled={state === 'loading' || state === 'done'}
        >
          {state === 'loading' ? '登録中...' : '事前登録する'}
        </Button>
        
        {state === 'dup' && (
          <div className="flex items-center gap-2 justify-center text-amber-500 text-sm">
            <MascotImage variant="question" size="small" />
            <p>すでに登録済みです</p>
          </div>
        )}
        
        {state === 'done' && (
          <div className="flex items-center gap-2 justify-center text-emerald-400 text-sm">
            <MascotImage variant="happy" size="small" />
            <p>登録ありがとう！公開日にメールをお送りします</p>
          </div>
        )}
        
        {state === 'error' && (
          <div className="flex items-center gap-2 justify-center text-red-500 text-sm">
            <MascotImage variant="sad" size="small" />
            <p>エラーが発生しました。もう一度お試しください</p>
          </div>
        )}
      </form>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-gray-600">公開まで残り</h3>
        <Countdown 
          date="2025-05-25T00:00:00+09:00" 
          renderer={countdownRenderer}
        />
      </div>
    </div>
  );
};

export default PreRegisterForm;
