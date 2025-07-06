import ScoreSimulator from "@/components/ScoreSimulator";
import { fetchCardsFromCSV, fetchSongsFromCSV } from "@/data";

export default async function Home() {
  const [songs, cards] = await Promise.all([
    fetchSongsFromCSV(),
    fetchCardsFromCSV(),
  ]);

  return <ScoreSimulator songs={songs} cards={cards} />;
}
