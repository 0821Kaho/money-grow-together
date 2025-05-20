
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const PageHeader = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-bold text-[#333333]">Pigipe</h1>
        </div>
        <div className="flex gap-4">
          {isAuthenticated ? (
            <Button variant="outline" disabled className="opacity-70">公開後に開始できます</Button>
          ) : (
            <Button variant="outline" disabled className="opacity-70">公開後に開始できます</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
