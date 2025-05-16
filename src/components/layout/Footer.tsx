
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#333333] py-8 px-6 text-gray-300">
      <div className="container mx-auto max-w-md">
        <div className="flex flex-col">
          <h3 className="text-xl font-logo text-white">Pigipe</h3>
          <p className="text-sm text-gray-400 mt-1 mb-6">遊んで学べるお金アプリ</p>
          
          <nav className="flex flex-col sm:flex-row sm:gap-6 gap-2">
            <Link to="/terms" className="w-full sm:w-auto text-xs hover:text-gray-100 transition-colors py-2 sm:py-0">
              利用規約
            </Link>
            <Link to="/privacy" className="w-full sm:w-auto text-xs hover:text-gray-100 transition-colors py-2 sm:py-0">
              プライバシーポリシー
            </Link>
            <Link to="/impact" className="w-full sm:w-auto text-xs hover:text-gray-100 transition-colors py-2 sm:py-0">
              社会インパクト
            </Link>
            <Link to="/about" className="w-full sm:w-auto text-xs hover:text-gray-100 transition-colors py-2 sm:py-0">
              運営会社
            </Link>
          </nav>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-xs text-gray-400">
          &copy; 2025 Pigipe All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
