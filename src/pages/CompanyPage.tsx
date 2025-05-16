
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import MarkdownRenderer from "@/components/ui/markdown-renderer";

const CompanyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Sticky Header with blur effect */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/70 border-b border-gray-100/50">
        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-heading font-bold text-[#333333]">Pigipe</h1>
            </Link>
            <Link to="/" className="ml-auto flex items-center text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>トップへ戻る</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content with Markdown rendering */}
      <main>
        <div className="max-w-prose mx-auto px-4 py-10 space-y-6">
          <MarkdownRenderer filePath="/src/docs/company.md" />
          
          <div className="mt-12 flex justify-center">
            <Link to="/">
              <Button className="bg-gradient-to-r from-rose-400 to-pink-300 shadow-lg hover:shadow-xl transition-all px-8 py-6 h-auto rounded-xl">
                トップページへ
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyPage;
