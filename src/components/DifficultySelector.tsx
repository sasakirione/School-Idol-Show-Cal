import { Difficulty } from "@/types";

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  songName?: string;
}

export function DifficultySelector({
  selectedDifficulty,
  onDifficultyChange,
  songName,
}: DifficultySelectorProps) {
  const difficulties: Difficulty[] = ["NORMAL", "HARD", "EXPERT", "MASTER"];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        難易度設定{songName && `（${songName}）`}
      </label>
      <div className="flex flex-wrap gap-2">
        {difficulties.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => onDifficultyChange(difficulty)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedDifficulty === difficulty
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {difficulty}
          </button>
        ))}
      </div>
    </div>
  );
}
