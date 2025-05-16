
import { Link } from "react-router-dom";
import MascotImage from "../mascot/MascotImage";

const KPIBanner = () => {
  return (
    <Link to="/impact" className="block">
      <button 
        className="w-full h-24 flex items-center bg-[#FFF8E1] rounded-lg p-4 hover:bg-[#FFF3D6] transition-colors"
        aria-label="社会的ROIの詳細を見る"
      >
        <div className="relative">
          <MascotImage 
            variant="happy" 
            size="small" 
            className="mr-3" 
            animate={false}
            alt="ピギペ"
          />
          <span className="absolute -top-1 right-0 text-lg">💰</span>
        </div>
        <div className="flex-1 text-[#333] leading-tight">
          <p className="font-logo text-lg font-bold">+1,300万円 相当の生涯便益<sup className="text-xs">*1</sup></p>
          <p className="font-logo text-sm">完全無料で学べる！</p>
        </div>
        <span className="text-pink-500 font-bold">
          詳細を見る ›
        </span>
      </button>
    </Link>
  );
};

export default KPIBanner;
