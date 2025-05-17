
import { useEffect, useState } from 'react';

type CountdownProps = {
  targetDate: string;
  className?: string;
};

const Countdown = ({ targetDate, className = "" }: CountdownProps) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearTimeout(timer);
  });

  return (
    <div className={`${className} text-center`}>
      <p className="text-muted-foreground mb-2 font-body">公開まであと</p>
      <div className="flex justify-center gap-4">
        <div className="flex flex-col items-center">
          <div className="bg-primary/10 rounded-md w-16 h-16 flex items-center justify-center">
            <span className="font-number text-2xl font-bold text-primary">{timeLeft.days}</span>
          </div>
          <span className="text-xs mt-1 font-body text-muted-foreground">日</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary/10 rounded-md w-16 h-16 flex items-center justify-center">
            <span className="font-number text-2xl font-bold text-primary">{timeLeft.hours}</span>
          </div>
          <span className="text-xs mt-1 font-body text-muted-foreground">時間</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary/10 rounded-md w-16 h-16 flex items-center justify-center">
            <span className="font-number text-2xl font-bold text-primary">{timeLeft.minutes}</span>
          </div>
          <span className="text-xs mt-1 font-body text-muted-foreground">分</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-primary/10 rounded-md w-16 h-16 flex items-center justify-center">
            <span className="font-number text-2xl font-bold text-primary">{timeLeft.seconds}</span>
          </div>
          <span className="text-xs mt-1 font-body text-muted-foreground">秒</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
