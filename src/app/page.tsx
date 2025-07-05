import ScoreSimulator from "@/components/ScoreSimulator";
import path from "node:path";
import { Idol, Song } from "@/types";
import { parse } from "csv-parse/sync";
import { promises as fs } from "fs";
import { fetchCardsFromCSV } from "@/data";

export default async function Home() {
  const filePath1 = path.join(process.cwd(), "data", "song.csv");

  const csvBuffer = await fs.readFile(filePath1);

  // ❃ パース（列名をキーにオブジェクト化）
  type CsvRow = {
    id: string;
    song: string;
    center: Idol;
    type: "Cool" | "Smile" | "Pure";
  };

  const rows = parse(csvBuffer, {
    columns: true,
    skip_empty_lines: true,
  }) as CsvRow[];

  // ❹ 目的の形にマッピング
  const songs: Song[] = rows.map((r) => ({
    id: Number(r.id),
    name: r.song,
    attribute: r.type,
    center: r.center,
  }));

  const cards = await fetchCardsFromCSV();

  return <ScoreSimulator songs={songs} cards={cards} />;
}
