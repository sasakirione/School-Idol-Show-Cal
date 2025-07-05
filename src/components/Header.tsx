interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <header className="text-center mb-4 relative">
      <div className="relative bg-gradient-to-r from-pink-200/80 via-white/90 to-pink-200/80 rounded-xl py-3 px-6 shadow-lg border border-pink-300/50">
        <h1
          className="text-xl font-bold text-gray-800 tracking-wide"
          style={{ fontFamily: "serif" }}
        >
          Link Like LoveLive! スクールアイドルショウ
          <span className="text-pink-600 ml-2">スコアシミュレーター</span>
        </h1>
      </div>
    </header>
  );
}
