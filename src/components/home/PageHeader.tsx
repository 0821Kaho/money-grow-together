
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProfileButton from "../ui/ProfileButton";

const PageHeader = () => {
  const { isAuthenticated } = useAuth();

  const scrollToModules = () => {
    document.getElementById("modules-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-logo font-bold text-[#333333]">
            <span className="font-extrabold">Pigipe</span>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="outline">
                  ログイン
                </Button>
              </Link>
              <Link to="/signup" className="hidden sm:block">
                <Button>
                  アカウント登録
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button 
                variant="outline"
                onClick={scrollToModules}
              >
                学習を始める
              </Button>
              <Link to="/modules" className="hidden sm:block">
                <Button>
                  マイページ
                </Button>
              </Link>
              <ProfileButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
