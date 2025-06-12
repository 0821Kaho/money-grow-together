
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const WeeklySummarySkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pigipeBlue/30 via-pigipeYellow/20 to-pigipeLavender/30 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Progress Bar Skeleton */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-3 w-full rounded-full" />
          <div className="flex justify-between mt-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-3 h-3 rounded-full" />
            ))}
          </div>
        </motion.div>

        {/* Title Skeleton */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-8 w-40" />
          </div>
        </div>

        {/* Result Card Skeleton */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-32" />
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Status Skeleton */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-3 w-12 mx-auto mb-1" />
                <Skeleton className="h-8 w-20 mx-auto mb-2" />
                <Skeleton className="h-3 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Pigipe Speech Skeleton */}
        <div className="flex items-start gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 bg-white/60 rounded-3xl p-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton className="w-full h-14 rounded-2xl" />
      </div>
    </div>
  );
};

export default WeeklySummarySkeleton;
