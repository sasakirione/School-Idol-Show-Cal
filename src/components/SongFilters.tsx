import { Attribute, Idol, IDOLS } from "@/types";

interface SongFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  attributeFilter: "All" | Attribute;
  onAttributeFilterChange: (attribute: "All" | Attribute) => void;
  centerFilter: Idol | null;
  onCenterFilterChange: (center: Idol | null) => void;
}

export function SongFilters({
  searchQuery,
  onSearchChange,
  attributeFilter,
  onAttributeFilterChange,
  centerFilter,
  onCenterFilterChange,
}: SongFiltersProps) {
  return (
    <div className="mb-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          楽曲を検索
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="楽曲名を入力してください..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          属性で絞り込み
        </label>
        <div className="flex flex-wrap gap-2">
          {(["All", "Smile", "Cool", "Pure"] as const).map((attribute) => (
            <button
              key={attribute}
              onClick={() => onAttributeFilterChange(attribute)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                attributeFilter === attribute
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {attribute === "All" ? "全て" : attribute}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          センターで絞り込み
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCenterFilterChange(null)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              centerFilter === null
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            全て
          </button>
          {IDOLS.map((center) => (
            <button
              key={center}
              onClick={() => onCenterFilterChange(center)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                centerFilter === center
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {center}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
