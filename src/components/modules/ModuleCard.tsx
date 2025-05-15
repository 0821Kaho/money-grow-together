
import { useNavigate } from "react-router-dom";

interface ModuleCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  isLocked?: boolean;
}

const ModuleCard = ({
  id,
  title,
  description,
  icon,
  color,
  progress,
  isLocked = false,
}: ModuleCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLocked) {
      navigate(`/module/${id}`);
    }
  };

  return (
    <div
      className={`module-card ${isLocked ? "locked" : ""} cursor-pointer`}
      style={{ borderColor: isLocked ? "transparent" : "#25B589" }}
      onClick={handleClick}
    >
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="rounded-full bg-white/90 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m0 0v2m0-2h2m-2 0h-2m8-12H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2z"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: color }}
        >
          <div dangerouslySetInnerHTML={{ __html: icon }} />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <p className="mb-5 text-sm text-game-dark">{description}</p>

      <div className="mt-auto">
        <div className="mb-2 flex justify-between">
          <span className="text-xs font-medium">進捗</span>
          <span className="text-xs font-medium">{progress}%</span>
        </div>
        <div className="progress-bar">
          {progress === 100 ? (
            <div
              className="progress-bar-fill-complete"
              style={{ width: `${progress}%` }}
            ></div>
          ) : (
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
