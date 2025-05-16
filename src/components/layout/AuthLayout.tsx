
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F5] to-white flex flex-col">
      {/* Header with logo */}
      <header className="container mx-auto py-6 px-4">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-heading font-bold text-[#333333]">Pigipe</h1>
        </Link>
      </header>
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="container mx-auto py-4 px-4 text-center text-sm text-muted-foreground">
        <div className="flex justify-center space-x-4">
          <Link to="/terms" className="hover:underline">利用規約</Link>
          <Link to="/privacy" className="hover:underline">プライバシーポリシー</Link>
        </div>
        <p className="mt-2">© 2025 Pigipe All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
