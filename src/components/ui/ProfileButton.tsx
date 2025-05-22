
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const ProfileButton = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    closeDropdown();
  };

  const handleLogout = () => {
    logout();
    toast.success("ログアウトしました");
    navigate("/");
    closeDropdown();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-game-primary text-white"
      >
        <span className="font-bold">ユ</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={closeDropdown}
          />
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
            <button
              onClick={() => handleNavigate("/profile")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              プロフィール
            </button>
            <button
              onClick={() => handleNavigate("/settings")}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              設定
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut className="mr-2 h-4 w-4" />
              ログアウト
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileButton;
