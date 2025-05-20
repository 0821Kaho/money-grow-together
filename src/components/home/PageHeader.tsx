
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PageHeader = () => {
  const { isAuthenticated } = useAuth();

  const scrollToWaitlist = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
          {!isAuthenticated && (
            <Button 
              variant="outline"
              onClick={scrollToWaitlist}
            >
              事前登録する
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
