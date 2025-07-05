import { Card, Idol, IDOLS } from "@/types";
import { useState } from "react";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: Card[];
  selectedCards: (Card | null)[];
  editingSlotIndex: number | null;
  onCardSelect: (card: Card) => void;
  onCardRemove: () => void;
}

export function CardModal({
  isOpen,
  onClose,
  cards,
  selectedCards,
  editingSlotIndex,
  onCardSelect,
  onCardRemove,
}: CardModalProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedIdol, setSelectedIdol] = useState<Idol | "All">("All");

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      card.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
    const matchesIdol = selectedIdol === "All" || card.idol === selectedIdol;
    return matchesSearch && matchesIdol;
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">
              カード選択 - スロット{" "}
              {editingSlotIndex !== null ? editingSlotIndex + 1 : ""}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 flex-shrink-0">
            {editingSlotIndex !== null && selectedCards[editingSlotIndex] && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-red-700">
                    現在選択中: {selectedCards[editingSlotIndex]?.name}
                  </span>
                  <button
                    onClick={onCardRemove}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    削除
                  </button>
                </div>
              </div>
            )}

            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  カード名で検索
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="カード名を入力してください..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  アイドルで絞り込み
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedIdol("All")}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      selectedIdol === "All"
                        ? "bg-pink-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    全て
                  </button>
                  {IDOLS.map((idol) => (
                    <button
                      key={idol}
                      onClick={() => setSelectedIdol(idol)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                        selectedIdol === idol
                          ? "bg-pink-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {idol}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 px-6 pb-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCards.map((card) => {
                const isAlreadySelected = selectedCards.some(
                  (selectedCard) => selectedCard?.id === card.id,
                );
                const canSelect =
                  !isAlreadySelected ||
                  selectedCards[editingSlotIndex!]?.id === card.id;

                return (
                  <div
                    key={card.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800">
                          {card.idol}
                        </span>
                        <span className="text-sm text-gray-600">
                          {card.name}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <span
                          className={`px-2 py-1 rounded text-sm font-bold ${
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
                          className={`px-2 py-1 rounded text-sm font-bold ${
                            card.attribute === "Smile"
                              ? "bg-pink-500 text-white"
                              : card.attribute === "Cool"
                                ? "bg-blue-500 text-white"
                                : "bg-green-500 text-white"
                          }`}
                        >
                          {card.attribute}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      <div>Smile: {card.smile}</div>
                      <div>Pure: {card.pure}</div>
                      <div>Cool: {card.cool}</div>
                    </div>
                    <button
                      onClick={() => onCardSelect(card)}
                      disabled={!canSelect}
                      className={`w-full font-bold py-2 px-4 rounded transition ${
                        !canSelect
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-pink-500 hover:bg-pink-600 text-white"
                      }`}
                    >
                      {!canSelect ? "選択済み" : "選択"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
