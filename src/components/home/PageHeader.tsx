
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PageHeader = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-heading font-bold text-[#333333]">Pigipe</Link>
        </div>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/modules'}
            >
              学習を始める
            </Button>
          ) : (
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/signup'}
            >
              無料でアカウント作成
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
