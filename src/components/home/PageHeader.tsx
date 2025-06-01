
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PageHeader = () => {
  const scrollToModules = () => {
    const modulesSection = document.querySelector('#modules-section');
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
          <Link to="/modules">
            <Button variant="outline">
              学習モジュール
            </Button>
          </Link>
          <Button onClick={scrollToModules}>
            今すぐ始める
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
