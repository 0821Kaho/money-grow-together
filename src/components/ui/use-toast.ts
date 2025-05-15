
// This file acts as a bridge to the actual use-toast.ts implementation in hooks directory
// to avoid circular dependencies
import { useToast as useHookToast, toast as hookToast } from "@/hooks/use-toast";

export { useHookToast as useToast, hookToast as toast };
