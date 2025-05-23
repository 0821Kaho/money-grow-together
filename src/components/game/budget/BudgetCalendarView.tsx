
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, DollarSign, Star } from "lucide-react";
import { getBudgetEvents } from "@/lib/budget-events";
import { useIsMobile } from "@/hooks/use-mobile";

const monthStart = new Date(2023, 0, 1); // 1月1日
const monthEnd = new Date(2023, 0, 31); // 1月31日
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

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const day = date.getDate();
    if (day <= currentDay) {
      setSelectedDate(date);
      onSelectDay(day);
    }
  };

  return (
    <div className="rounded-lg bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">家計カレンダー</h3>
        <Badge variant="outline" className="bg-[#25B589] text-white">
          {currentDay}/30日目
        </Badge>
      </div>

      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={{ before: monthStart, after: new Date(2023, 0, currentDay) }}
            fromMonth={monthStart}
            toMonth={monthStart}
            locale={ja}
            classNames={{
              day_selected: "bg-[#25B589] text-white",
              day_today: "bg-[#F7F7F7] text-[#25B589] font-bold",
              day_outside: "text-gray-300 opacity-50",
            }}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-[#25B589]"></div>
              <span className="text-xs">今日</span>
            </div>
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-gray-200"></div>
              <span className="text-xs">完了済み</span>
            </div>
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-gray-400"></div>
              <span className="text-xs">今後</span>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-4">
              {selectedDate && (
                <>
                  <h4 className="mb-2 text-base font-bold">
                    {format(selectedDate, "M月d日", { locale: ja })}のイベント
                  </h4>
                  
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
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BudgetCalendarView;
