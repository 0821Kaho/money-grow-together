
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBudgetEvents } from "@/lib/budget-events";

interface PastEventsAccordionProps {
  currentDay: number;
  completedEvents: number[];
}

const PastEventsAccordion = ({ currentDay, completedEvents }: PastEventsAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const events = getBudgetEvents().filter(event => event.day < currentDay);

  if (events.length === 0) return null;

  return (
    <div className="mt-4 border rounded-lg overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">過去のイベントを見る</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ScrollArea className="max-h-60 p-4">
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="relative pl-6 border-l-2 border-gray-200">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-white border-2 border-gray-200" />
                    <div className="mb-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {event.day}日目
                      </span>
                    </div>
                    <h4 className="font-medium text-sm leading-relaxed">{event.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PastEventsAccordion;
