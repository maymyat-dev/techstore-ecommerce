import {
  Smartphone,
  Tablet,
  Laptop,
  Monitor,
  Headphones,
  Watch,
} from "lucide-react";
import SuggestionButton from "./suggestion-button";

const items = [
  { id: 1, label: "iPhone", value: "iphone", icon: Smartphone },
  { id: 2, label: "iPad", value: "ipad", icon: Tablet },
  { id: 3, label: "MacBook", value: "macbook", icon: Laptop },
  { id: 4, label: "iMac", value: "imac", icon: Monitor },
  { id: 5, label: "AirPods", value: "airpods", icon: Headphones },
  { id: 6, label: "iWatch", value: "iwatch", icon: Watch },
];

type SuggestionButtonProps = {
  onSelect: (value: string) => void;
};
const SuggestionGrid = ({ onSelect }: SuggestionButtonProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4 px-4">
      {items.map((item) => (
        <SuggestionButton
          key={item.id}
          label={item.label}
          icon={item.icon}
          onClick={() => onSelect(item.value)}
        />
      ))}
    </div>
  );
};

export default SuggestionGrid;
