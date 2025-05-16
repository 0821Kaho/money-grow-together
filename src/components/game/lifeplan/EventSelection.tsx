
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { School, Briefcase, Heart, Baby, Home, Coffee, Plus } from "lucide-react";
import { LifeEvent } from "./LifePlanModules";

// Default events data
const defaultEvents: Partial<LifeEvent>[] = [
  {
    id: "university",
    type: "education",
    title: "大学進学",
    cost: 3000000, // 300万円
    description: "大学4年間の平均学費は約300万円です。国公立と私立で差があります。",
    icon: "School"
  },
  {
    id: "job",
    type: "job",
    title: "就職",
    cost: 0,
    description: "社会人としての第一歩です。",
    icon: "Briefcase"
  },
  {
    id: "marriage",
    type: "marriage",
    title: "結婚",
    cost: 2000000, // 200万円
    description: "結婚式の費用の全国平均は約200万円です。",
    icon: "Heart"
  },
  {
    id: "childbirth1",
    type: "childbirth",
    title: "第一子出産",
    cost: 1000000, // 100万円
    description: "出産から小学校入学前までの育児費用目安です。",
    icon: "Baby"
  },
  {
    id: "childbirth2",
    type: "childbirth",
    title: "第二子出産",
    cost: 1000000, // 100万円
    description: "出産から小学校入学前までの育児費用目安です。",
    icon: "Baby"
  },
  {
    id: "house",
    type: "housing",
    title: "住宅購入",
    cost: 30000000, // 3000万円
    description: "住宅購入の平均価格は約3000万円です。地域によって異なります。",
    icon: "Home"
  },
  {
    id: "retirement",
    type: "retirement",
    title: "退職",
    cost: 0,
    description: "老後の生活に向けた準備を始めましょう。",
    icon: "Coffee"
  }
];

// Props type definition
interface EventSelectionProps {
  onComplete: (events: LifeEvent[]) => void;
}

const EventSelection = ({ onComplete }: EventSelectionProps) => {
  const [currentAge, setCurrentAge] = useState(22);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedEvents, setSelectedEvents] = useState<LifeEvent[]>([]);
  const [activeTab, setActiveTab] = useState<string>("education");
  
  // Helper to get icon component
  const getIconComponent = (iconName: string) => {
    switch(iconName) {
      case "School": return <School className="h-6 w-6" />;
      case "Briefcase": return <Briefcase className="h-6 w-6" />;
      case "Heart": return <Heart className="h-6 w-6" />;
      case "Baby": return <Baby className="h-6 w-6" />;
      case "Home": return <Home className="h-6 w-6" />;
      case "Coffee": return <Coffee className="h-6 w-6" />;
      default: return <Plus className="h-6 w-6" />;
    }
  };
  
  // Toggle event selection
  const toggleEvent = (event: Partial<LifeEvent>) => {
    // Check if event is already selected
    const existingIndex = selectedEvents.findIndex(e => e.id === event.id);
    
    if (existingIndex >= 0) {
      // Remove the event
      setSelectedEvents(prev => prev.filter(e => e.id !== event.id));
    } else {
      // Add event with default age based on current age
      const ageOffset = {
        university: 0,
        job: 4,
        marriage: 8,
        childbirth1: 10,
        childbirth2: 13,
        house: 12,
        retirement: 43
      };
      
      const defaultAge = currentAge + (ageOffset[event.id as keyof typeof ageOffset] || 0);
      
      // Add the event with complete data
      const completeEvent: LifeEvent = {
        ...event as LifeEvent,
        age: defaultAge,
        year: currentYear + (defaultAge - currentAge),
      };
      
      setSelectedEvents(prev => [...prev, completeEvent]);
    }
  };
  
  // Update event age
  const updateEventAge = (eventId: string, newAge: number) => {
    setSelectedEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { 
              ...event, 
              age: newAge,
              year: currentYear + (newAge - currentAge)
            } 
          : event
      )
    );
  };
  
  // Update event cost
  const updateEventCost = (eventId: string, newCost: number) => {
    setSelectedEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, cost: newCost } 
          : event
      )
    );
  };
  
  // Handle completion
  const handleComplete = () => {
    // Sort events by age
    const sortedEvents = [...selectedEvents].sort((a, b) => a.age - b.age);
    onComplete(sortedEvents);
  };
  
  // Filter events by type for tabs
  const eventsByType = (type: string) => {
    return defaultEvents.filter(event => event.type === type);
  };
  
  // Check if an event is selected
  const isEventSelected = (eventId: string) => {
    return selectedEvents.some(event => event.id === eventId);
  };
  
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            現在の年齢
          </label>
          <Slider
            value={[currentAge]}
            min={18}
            max={65}
            step={1}
            onValueChange={(value) => setCurrentAge(value[0])}
            className="mb-1"
          />
          <div className="text-sm text-gray-500">{currentAge}歳（{currentYear}年）</div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">人生のイベントを選択しよう</h3>
          <p className="text-sm text-gray-500 mb-4">
            あなたの人生で起こるであろう主要なイベントを選択し、時期と費用を設定します。
            イベントをクリックで選択・解除できます。
          </p>
          
          <Tabs defaultValue="education" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-4">
              <TabsTrigger value="education">進学</TabsTrigger>
              <TabsTrigger value="job">仕事</TabsTrigger>
              <TabsTrigger value="family">家族</TabsTrigger>
              <TabsTrigger value="housing">住居</TabsTrigger>
            </TabsList>
            
            <TabsContent value="education">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eventsByType("education").map(event => (
                  <button
                    key={event.id}
                    className={`flex items-center p-3 rounded-lg border transition-all ${
                      isEventSelected(event.id!) 
                        ? "border-primary bg-primary/10" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleEvent(event)}
                  >
                    <div className={`rounded-full p-2 mr-3 ${
                      isEventSelected(event.id!) ? "bg-primary text-white" : "bg-gray-100"
                    }`}>
                      {getIconComponent(event.icon!)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-500">約{(event.cost! / 10000).toLocaleString()}万円</div>
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="job">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eventsByType("job").map(event => (
                  <button
                    key={event.id}
                    className={`flex items-center p-3 rounded-lg border transition-all ${
                      isEventSelected(event.id!) 
                        ? "border-primary bg-primary/10" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleEvent(event)}
                  >
                    <div className={`rounded-full p-2 mr-3 ${
                      isEventSelected(event.id!) ? "bg-primary text-white" : "bg-gray-100"
                    }`}>
                      {getIconComponent(event.icon!)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-500">{event.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="family">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...eventsByType("marriage"), ...eventsByType("childbirth")].map(event => (
                  <button
                    key={event.id}
                    className={`flex items-center p-3 rounded-lg border transition-all ${
                      isEventSelected(event.id!) 
                        ? "border-primary bg-primary/10" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleEvent(event)}
                  >
                    <div className={`rounded-full p-2 mr-3 ${
                      isEventSelected(event.id!) ? "bg-primary text-white" : "bg-gray-100"
                    }`}>
                      {getIconComponent(event.icon!)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-500">約{(event.cost! / 10000).toLocaleString()}万円</div>
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="housing">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...eventsByType("housing"), ...eventsByType("retirement")].map(event => (
                  <button
                    key={event.id}
                    className={`flex items-center p-3 rounded-lg border transition-all ${
                      isEventSelected(event.id!) 
                        ? "border-primary bg-primary/10" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => toggleEvent(event)}
                  >
                    <div className={`rounded-full p-2 mr-3 ${
                      isEventSelected(event.id!) ? "bg-primary text-white" : "bg-gray-100"
                    }`}>
                      {getIconComponent(event.icon!)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{event.title}</div>
                      {event.cost! > 0 ? (
                        <div className="text-sm text-gray-500">約{(event.cost! / 10000).toLocaleString()}万円</div>
                      ) : (
                        <div className="text-sm text-gray-500">{event.description}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {selectedEvents.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-medium mb-2">選択したイベント</h3>
            
            <div className="space-y-4">
              {selectedEvents
                .sort((a, b) => a.age - b.age)
                .map(event => (
                <div key={event.id} className="p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="rounded-full p-2 bg-primary/10 mr-2">
                        {getIconComponent(event.icon)}
                      </div>
                      <div className="font-medium">{event.title}</div>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => toggleEvent(event)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">年齢</label>
                      <div className="flex items-center">
                        <Slider
                          value={[event.age]}
                          min={currentAge}
                          max={90}
                          step={1}
                          onValueChange={(value) => updateEventAge(event.id, value[0])}
                          className="flex-grow mr-2"
                        />
                        <span className="text-sm font-medium w-12">{event.age}歳</span>
                      </div>
                      <div className="text-xs text-gray-500">{event.year}年</div>
                    </div>
                    
                    {event.cost > 0 && (
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">費用（万円）</label>
                        <div className="flex items-center">
                          <Slider
                            value={[event.cost / 10000]}
                            min={0}
                            max={event.type === "housing" ? 5000 : 1000}
                            step={10}
                            onValueChange={(value) => updateEventCost(event.id, value[0] * 10000)}
                            className="flex-grow mr-2"
                          />
                          <span className="text-sm font-medium w-16">{(event.cost / 10000).toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleComplete}
            disabled={selectedEvents.length === 0}
          >
            ライフイベント設定完了
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventSelection;
