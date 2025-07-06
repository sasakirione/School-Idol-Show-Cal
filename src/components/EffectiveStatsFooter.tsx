import { Card, Song } from "@/types";
import { calculateEffectiveStats } from "@/utils/scoreCalculation";

type EffectiveStatsFooterProps = {
  selectedCards: (Card | null)[];
  selectedSong: Song | null;
};

export function EffectiveStatsFooter({
  selectedCards,
  selectedSong,
}: EffectiveStatsFooterProps) {
  const effectiveStats = calculateEffectiveStats(selectedCards, selectedSong);
  const validCardsCount = selectedCards.filter((card) => card !== null).length;

  const getAttributeColor = (attribute: string | undefined): string => {
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

  const getAttributeBgColor = (attribute: string | undefined): string => {
    switch (attribute) {
      case "Smile":
        return "bg-pink-100";
      case "Cool":
        return "bg-blue-100";
      case "Pure":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-700">
              実質ステータス ({validCardsCount}/6)
            </div>
            {selectedSong && (
              <div
                className={`text-xs px-2 py-1 rounded-full ${getAttributeBgColor(selectedSong.attribute)} ${getAttributeColor(selectedSong.attribute)}`}
              >
                {selectedSong.attribute}楽曲
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-4 text-sm">
              <div className="text-center">
                <div className="text-pink-600 font-bold">
                  {effectiveStats.smile.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Smile</div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-bold">
                  {effectiveStats.pure.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Pure</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 font-bold">
                  {effectiveStats.cool.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Cool</div>
              </div>
            </div>

            <div className="border-l border-gray-300 pl-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">
                  {effectiveStats.total.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">合計</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
