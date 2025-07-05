"use client";

import { useState } from "react";
import { Card, Song, Difficulty, Attribute, Idol } from "@/types";
import { Header } from "@/components/Header";
import { CardSelection } from "@/components/CardSelection";
import { SongSelection } from "@/components/SongSelection";
import { CardModal } from "@/components/CardModal";
import { EffectiveStatsFooter } from "@/components/EffectiveStatsFooter";

type Props = {
  songs: Song[];
  cards: Card[];
};

export default function ScoreSimulator(props: Props) {
  const [selectedCards, setSelectedCards] = useState<(Card | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("NORMAL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [attributeFilter, setAttributeFilter] = useState<"All" | Attribute>(
    "All",
  );
  const [centerFilter, setCenterFilter] = useState<Idol | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
  const [editingSlotIndex, setEditingSlotIndex] = useState<number | null>(null);

  const filteredSongs = props.songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (attributeFilter === "All" || song.attribute === attributeFilter) &&
      (centerFilter === null || song.center === centerFilter),
  );

  const handleCardSlotClick = (index: number) => {
    setEditingSlotIndex(index);
    setIsCardModalOpen(true);
  };

  const handleCardSelect = (card: Card) => {
    if (editingSlotIndex !== null) {
      const newSelectedCards = [...selectedCards];
      newSelectedCards[editingSlotIndex] = card;
      setSelectedCards(newSelectedCards);
      setIsCardModalOpen(false);
      setEditingSlotIndex(null);
    }
  };

  const handleCardRemove = () => {
    if (editingSlotIndex !== null) {
      const newSelectedCards = [...selectedCards];
      newSelectedCards[editingSlotIndex] = null;
      setSelectedCards(newSelectedCards);
      setIsCardModalOpen(false);
      setEditingSlotIndex(null);
    }
  };

  const handleCardDeselect = (index: number) => {
    const newSelectedCards = [...selectedCards];
    newSelectedCards[index] = null;
    setSelectedCards(newSelectedCards);
  };

  const handleCardReorder = (newCards: (Card | null)[]) => {
    setSelectedCards(newCards);
  };

  const closeModal = () => {
    setIsCardModalOpen(false);
    setEditingSlotIndex(null);
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: "#ffc0cb" }}>
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="grid lg:grid-cols-2 gap-8">
          <CardSelection
            selectedCards={selectedCards}
            onCardSlotClick={handleCardSlotClick}
            onCardDeselect={handleCardDeselect}
            onCardReorder={handleCardReorder}
          />

          <div className="space-y-6">
            <SongSelection
              songs={filteredSongs}
              selectedSong={selectedSong}
              onSongSelect={setSelectedSong}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              attributeFilter={attributeFilter}
              onAttributeFilterChange={setAttributeFilter}
              centerFilter={centerFilter}
              onCenterFilterChange={setCenterFilter}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
            />
          </div>
        </div>

        <CardModal
          isOpen={isCardModalOpen}
          onClose={closeModal}
          cards={props.cards}
          selectedCards={selectedCards}
          editingSlotIndex={editingSlotIndex}
          onCardSelect={handleCardSelect}
          onCardRemove={handleCardRemove}
        />
      </div>

      <EffectiveStatsFooter
        selectedCards={selectedCards}
        selectedSong={selectedSong}
      />
    </div>
  );
}
