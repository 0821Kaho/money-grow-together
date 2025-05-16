
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MascotImage from "@/components/mascot/MascotImage";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl font-heading font-bold text-[#333333]">Pigipe</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <motion.div
          className="max-w-md text-center py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex justify-center">
            <MascotImage variant="waiting" size="xl" />
          </div>
          
          <h1 className="text-3xl font-heading font-bold mb-4">準備中です</h1>
          <p className="text-lg text-gray-600 mb-8">
            コンテンツは現在準備中です。公開までもうしばらくお待ちください！
          </p>
          
          <Link to="/">
            <Button>トップページに戻る</Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoonPage;
