
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PageHeader = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-logo font-bold text-[#333333]">
            <span className="font-extrabold">Pigipe</span>
          </Link>
        </div>
        <div className="flex gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline">
                  ログイン
                </Button>
              </Link>
              <Link to="/signup">
                <Button>
                  登録する
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/modules">
              <Button>
                マイページ
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
