
import { Link } from "react-router-dom";

const PageHeader = () => {
  return (
    <header className="container mx-auto py-6 px-4">
      <div className="flex justify-start items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-logo font-bold text-[#333333]">
            <span className="font-extrabold">Pigipe</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
