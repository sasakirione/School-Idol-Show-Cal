import { Card } from "@/types";

type SelectedCardDetailsProps = {
  selectedCards: (Card | null)[];
  totalScore: number;
};

const getAttributeColor = (attribute: string): string => {
  switch (attribute) {
    case "Smile":
      return "text-pink-600";
    case "Cool":
      return "text-blue-600";
    case "Pure":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case "SSR":
      return "bg-yellow-500";
    case "SR":
      return "bg-purple-500";
    case "R":
      return "bg-blue-500";
    case "N":
      return "bg-gray-500";
    default:
      return "bg-gray-400";
  }
};

// noinspection JSUnusedLocalSymbols
export function SelectedCardDetails({
  selectedCards,
  totalScore,
}: SelectedCardDetailsProps) {
  const validCards = selectedCards.filter(
    (card): card is Card => card !== null,
  );
  const totalStats = validCards.reduce(
    (sum, card) => ({
      smile: sum.smile + card.smile,
      pure: sum.pure + card.pure,
      cool: sum.cool + card.cool,
    }),
    { smile: 0, pure: 0, cool: 0 },
  );

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        選択されたカード ({validCards.length}/6)
      </h2>

      {validCards.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validCards.map((card) => (
              <div
                key={card.id}
                className="bg-white/80 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800 flex-1">
                    {card.name}
                  </h3>
                  <div className="flex gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold text-white ${getRarityColor(card.rarity)}`}
                    >
                      {card.rarity}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${getAttributeColor(card.attribute)}`}
                    >
                      {card.attribute}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-800 flex-1">
                    {card.idol}
                  </h3>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-pink-600">
                    <span className="font-semibold">Smile:</span> {card.smile}
                  </div>
                  <div className="text-green-600">
                    <span className="font-semibold">Pure:</span> {card.pure}
                  </div>
                  <div className="text-blue-600">
                    <span className="font-semibold">Cool:</span> {card.cool}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              合計ステータス
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-pink-100 rounded-lg p-3">
                <div className="text-pink-600 font-bold text-xl">
                  {totalStats.smile}
                </div>
                <div className="text-sm text-gray-600">Smile</div>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <div className="text-green-600 font-bold text-xl">
                  {totalStats.pure}
                </div>
                <div className="text-sm text-gray-600">Pure</div>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <div className="text-blue-600 font-bold text-xl">
                  {totalStats.cool}
                </div>
                <div className="text-sm text-gray-600">Cool</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          カードが選択されていません
        </div>
      )}
    </div>
  );
}
