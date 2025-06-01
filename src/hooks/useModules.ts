
import { useState, useEffect } from 'react';
import modulesData from '@/data/modules.json';

export interface Module {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  isLocked: boolean;
  badge?: "bronze" | "silver" | "gold";
  illustration?: string;
}

export const useModules = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for consistency with previous behavior
    const timer = setTimeout(() => {
      setModules(modulesData as Module[]);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getModuleById = (id: number) => {
    return modules.find(module => module.id === id);
  };

  return {
    modules,
    isLoading,
    getModuleById
  };
};
