
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const PageHeader = ({ className }: { className?: string }) => {
  const { isAuthenticated } = useAuth();

  return (
    <header className={cn("container mx-auto px-4 py-6 flex items-center justify-between", className)}>
      {/* Logo/Title */}
      <Link to="/" className="flex items-center gap-2">
        <h1 className="text-2xl font-heading font-bold text-[#333333]">Pigipe</h1>
      </Link>
      
      {/* Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          ホーム
        </Link>
        <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          運営会社
        </Link>
        <Link to="/impact" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          社会的インパクト
        </Link>
      </nav>
      
      {/* Auth buttons */}
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <Button asChild variant="outline" className="font-medium">
            <Link to="/modules">アプリへ</Link>
          </Button>
        ) : (
          <>
            <Button asChild variant="ghost" className="font-medium">
              <Link to="/login">ログイン</Link>
            </Button>
            <Button asChild className="font-medium">
              <Link to="/signup">登録する</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
