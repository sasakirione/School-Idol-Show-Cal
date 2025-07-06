type ScoreDisplayProps = {
  score: number;
};

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  if (score <= 0) return null;

  return (
    <div className="mt-6 text-center">
      <div className="bg-white/80 rounded-lg p-6 border border-pink-300">
        <h3 className="text-xl font-bold text-gray-800 mb-2">予想スコア</h3>
        <div className="text-3xl font-bold text-pink-600">
          {score.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
