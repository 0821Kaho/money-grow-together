
import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, DollarSign, Star } from "lucide-react";
import { getBudgetEvents } from "@/lib/budget-events";
import { useIsMobile } from "@/hooks/use-mobile";

const dayEvents = getBudgetEvents();

const BudgetCalendarView = ({
  onSelectDay,
  currentDay,
  completedDays,
}: {
  onSelectDay: (day: number) => void;
  currentDay: number;
  completedDays: number[];
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2023, 0, currentDay)
  );
  const isMobile = useIsMobile();

  const handleDateSelect = (day: number) => {
    const date = new Date(2023, 0, day);
    if (day <= currentDay) {
      setSelectedDate(date);
      onSelectDay(day);
    }
  };

  // Get the current day's events
  const currentDayEvents = dayEvents.filter(event => event.day === currentDay);

  return (
    <div className="rounded-lg bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg">１ヶ月サバイバル</h3>
        <Badge variant="outline" className="bg-[#25B589] text-white">
          {currentDay}/30日目
        </Badge>
      </div>

      <Card>
        <CardContent className="p-4">
          <h4 className="mb-2 text-base">
            {currentDay}日目のイベント
          </h4>
          
          {currentDayEvents.length > 0 ? (
            <div className="space-y-2">
              {currentDayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                >
                  <div className="mb-1 flex items-center gap-2">
                    {event.type === "expense" ? (
                      <DollarSign className="h-4 w-4 text-game-danger" />
                    ) : event.type === "income" ? (
                      <DollarSign className="h-4 w-4 text-[#25B589]" />
                    ) : (
                      <Star className="h-4 w-4 text-[#FFB547]" />
                    )}
                    <span className="font-medium break-words">{event.title}</span>
                  </div>
                  <p className="text-sm text-gray-600 break-words">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4">
              <CalendarDays className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">
                この日の特別なイベントはありません
              </span>
            </div>
          )}
          
          {/* Previous days selection */}
          <div className="mt-4">
            <h5 className="text-sm font-medium mb-2">過去のイベントを見る:</h5>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: currentDay }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={`h-8 w-8 flex items-center justify-center rounded-full text-sm ${
                    selectedDate?.getDate() === day
                      ? "bg-[#25B589] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Display selected day events if different from current day */}
          {selectedDate && selectedDate.getDate() !== currentDay && (
            <div className="mt-4 border-t pt-4">
              <h5 className="mb-2 text-sm font-medium">
                {format(selectedDate, "M月d日", { locale: ja })}のイベント
              </h5>
              
              {dayEvents.find(e => e.day === selectedDate.getDate()) ? (
                <div className="space-y-2">
                  {dayEvents
                    .filter(event => event.day === selectedDate.getDate())
                    .map((event, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                      >
                        <div className="mb-1 flex items-center gap-2">
                          {event.type === "expense" ? (
                            <DollarSign className="h-4 w-4 text-game-danger" />
                          ) : event.type === "income" ? (
                            <DollarSign className="h-4 w-4 text-[#25B589]" />
                          ) : (
                            <Star className="h-4 w-4 text-[#FFB547]" />
                          )}
                          <span className="font-medium break-words">{event.title}</span>
                        </div>
                        <p className="text-sm text-gray-600 break-words">
                          {event.description}
                        </p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4">
                  <CalendarDays className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    この日の特別なイベントはありません
                  </span>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetCalendarView;
