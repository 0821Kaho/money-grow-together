
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#333333] py-10 px-6 text-gray-300 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="mb-6 sm:mb-0">
            <h3 className="text-xl font-logo text-white font-extrabold">Pigipe</h3>
            <p className="text-sm text-gray-400 mt-1">ピギペと遊んで学べるお金アプリ</p>
          </div>
          
          <nav className="flex flex-col sm:flex-row gap-2 sm:gap-8">
            <Link to="/terms" className="text-sm hover:text-gray-100 transition-colors">
              利用規約
            </Link>
            <Link to="/privacy" className="text-sm hover:text-gray-100 transition-colors">
              プライバシーポリシー
            </Link>
            <Link to="/impact" className="text-sm hover:text-gray-100 transition-colors">
              社会インパクト
            </Link>
            <Link to="/about" className="text-sm hover:text-gray-100 transition-colors">
              運営会社
            </Link>
          </nav>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-xs text-gray-400">
          &copy; 2025 <span className="font-bold">Pigipe</span> All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
