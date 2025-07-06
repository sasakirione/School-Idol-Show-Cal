import { Card } from "@/types";
import { CardSlot } from "./CardSlot";
import { SelectedCardDetails } from "./SelectedCardDetails";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

type CardSelectionProps = {
  selectedCards: (Card | null)[];
  onCardSlotClick: (index: number) => void;
  onCardDeselect: (index: number) => void;
  onCardReorder: (newCards: (Card | null)[]) => void;
};

export function CardSelection({
  selectedCards,
  onCardSlotClick,
  onCardDeselect,
  onCardReorder,
}: CardSelectionProps) {
  const selectedCount = selectedCards.filter((card) => card !== null).length;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over?.id);

      const newCards = arrayMove(selectedCards, oldIndex, newIndex);
      onCardReorder(newCards);
    }
  };

  const cardIds = selectedCards.map((_, index) => index.toString());

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        カード選択 ({selectedCount}/6)
      </h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cardIds}
          strategy={horizontalListSortingStrategy}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {selectedCards.map((card, index) => (
              <CardSlot
                key={index}
                card={card}
                index={index}
                onClick={onCardSlotClick}
                onDeselect={onCardDeselect}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-6">
        <SelectedCardDetails selectedCards={selectedCards} totalScore={0} />
      </div>
    </div>
  );
}
