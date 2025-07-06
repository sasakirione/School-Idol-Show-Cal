import { Song, Attribute, Idol, Difficulty } from "@/types";
import { SongFilters } from "./SongFilters";
import { SongList } from "./SongList";
import { DifficultySelector } from "./DifficultySelector";

type SongSelectionProps = {
  songs: Song[];
  selectedSong: Song | null;
  onSongSelect: (song: Song) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  attributeFilter: "All" | Attribute;
  onAttributeFilterChange: (attribute: "All" | Attribute) => void;
  centerFilter: Idol | null;
  onCenterFilterChange: (center: Idol | null) => void;
  selectedDifficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
};

export function SongSelection({
  songs,
  selectedSong,
  onSongSelect,
  searchQuery,
  onSearchChange,
  attributeFilter,
  onAttributeFilterChange,
  centerFilter,
  onCenterFilterChange,
  selectedDifficulty,
  onDifficultyChange,
}: SongSelectionProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">楽曲選択</h2>

      <SongFilters
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        attributeFilter={attributeFilter}
        onAttributeFilterChange={onAttributeFilterChange}
        centerFilter={centerFilter}
        onCenterFilterChange={onCenterFilterChange}
      />

      <SongList
        songs={songs}
        selectedSong={selectedSong}
        onSongSelect={onSongSelect}
      />

      {selectedSong && (
        <DifficultySelector
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={onDifficultyChange}
          songName={selectedSong.name}
        />
      )}
    </div>
  );
}
