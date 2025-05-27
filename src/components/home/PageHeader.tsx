
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PageHeader = () => {
  const { isAuthenticated, logout } = useAuth();

  const scrollToRegistration = () => {
    document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogout = () => {
    logout();
  };

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
              <Button onClick={scrollToRegistration}>
                新規登録
              </Button>
            </>
          ) : (
            <>
              <Link to="/modules">
                <Button variant="outline">
                  学習モジュール
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                ログアウト
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
