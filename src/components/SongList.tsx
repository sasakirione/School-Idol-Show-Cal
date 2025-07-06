import { Song } from "@/types";
import Image from "next/image";
import { useState } from "react";

type SongJacketProps = {
  songId: number;
  songName: string;
};

function SongJacket({ songId, songName }: SongJacketProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">🎵</div>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={`/songs/${songId}.png`}
      alt={`${songName} ジャケット`}
      width={64}
      height={64}
      className="rounded-lg object-cover"
      onError={() => setImageError(true)}
    />
  );
}

type SongListProps = {
  songs: Song[];
  selectedSong: Song | null;
  onSongSelect: (song: Song) => void;
};

export function SongList({ songs, selectedSong, onSongSelect }: SongListProps) {
  return (
    <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg mb-6">
      <div className="space-y-2 p-2">
        {songs.map((song) => (
          <button
            key={song.id}
            onClick={() => onSongSelect(song)}
            className={`w-full text-left p-4 rounded-lg transition ${
              selectedSong?.id === song.id
                ? "bg-pink-100 border-2 border-pink-500"
                : "bg-white/70 hover:bg-white/80 border border-gray-200"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <SongJacket songId={song.id} songName={song.name} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-gray-800 truncate pr-2">
                    {song.name}
                  </div>
                  <div className="flex space-x-1 flex-shrink-0">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        song.attribute === "Smile"
                          ? "bg-pink-500 text-white"
                          : song.attribute === "Cool"
                            ? "bg-blue-500 text-white"
                            : "bg-green-500 text-white"
                      }`}
                    >
                      {song.attribute}
                    </span>
                    <span className="px-2 py-1 rounded text-xs font-bold bg-gray-500 text-white">
                      {song.center}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
