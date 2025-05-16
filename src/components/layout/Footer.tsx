
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#333333] py-8 px-6 text-gray-300">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-logo text-white">Pigipe</h3>
            </div>
            <p className="text-sm text-gray-400 mt-1">5分で学べるお金アプリ</p>
          </div>
          <div className="max-w-screen-sm flex flex-col items-start gap-2 md:flex-row md:gap-6">
            <Link to="/terms" className="w-full md:w-auto text-xs hover:text-gray-100 transition-colors leading-6">
              利用規約
            </Link>
            <Link to="/privacy" className="w-full md:w-auto text-xs hover:text-gray-100 transition-colors leading-6">
              プライバシーポリシー
            </Link>
            <Link to="/impact" className="w-full md:w-auto text-xs hover:text-gray-100 transition-colors leading-6">
              社会インパクト
            </Link>
            <Link to="/about" className="w-full md:w-auto text-xs hover:text-gray-100 transition-colors leading-6">
              運営会社
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-xs text-gray-400">
          &copy; 2025 Pigipe All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
