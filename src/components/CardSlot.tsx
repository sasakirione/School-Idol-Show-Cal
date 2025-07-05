import { Card } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardSlotProps {
  card: Card | null;
  index: number;
  onClick: (index: number) => void;
  onDeselect: (index: number) => void;
}

export function CardSlot({ card, index, onClick, onDeselect }: CardSlotProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: index.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={() => !card && onClick(index)}
      className={`aspect-[3/4] bg-white/70 rounded-lg p-3 border-2 border-dashed border-gray-300 hover:border-pink-400 transition-all duration-200 hover:shadow-md flex flex-col items-center justify-center relative ${
        card ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
      } ${isDragging ? "opacity-50 z-10" : ""}`}
    >
      {card ? (
        <div className="w-full h-full flex flex-col relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeselect(index);
            }}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 z-20"
          >
            ×
          </button>
          <div
            {...(card ? listeners : {})}
            className="flex-1 rounded-md bg-gray-200/30 mb-2 flex items-center justify-center touch-none"
          >
            <div className="text-center">
              <div className="font-bold text-gray-800 text-sm mb-2 truncate">
                {card.name}
              </div>
              <div className="flex justify-center space-x-1">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-bold ${
                    card.rarity === "SSR"
                      ? "bg-yellow-500"
                      : card.rarity === "SR"
                        ? "bg-purple-500"
                        : card.rarity === "R"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                  } text-white`}
                >
                  {card.rarity}
                </span>
                <span
                  className={`px-1 py-0.5 rounded text-xs font-bold ${
                    card.attribute === "Smile"
                      ? "bg-pink-500 text-white"
                      : card.attribute === "Cool"
                        ? "bg-blue-500 text-white"
                        : "bg-green-500 text-white"
                  }`}
                >
                  {card.attribute.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-4xl text-gray-400 mb-2">+</div>
          <div className="text-sm text-gray-500">カードを選択</div>
        </div>
      )}
    </div>
  );
}
