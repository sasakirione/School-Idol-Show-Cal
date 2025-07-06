import { Card, Song, Idol } from "@/types";
import { fetchAndParseCSV, convertCSVCardToCard, fetchCSVData } from "@/utils/csv";

export const fetchCardsFromCSV = async (): Promise<Card[]> => {
  try {
    const csvCards = await fetchAndParseCSV(
      "https://sasakirione.github.io/School-Idol-Show-Data/data/card.csv",
    );
    return csvCards.map(convertCSVCardToCard);
  } catch (error) {
    console.error("Failed to fetch cards from CSV:", error);
    return [];
  }
};

export const fetchSongsFromCSV = async (): Promise<Song[]> => {
  try {
    const csvText = await fetchCSVData(
      "https://sasakirione.github.io/School-Idol-Show-Data/data/song.csv"
    );
    
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) {
      throw new Error('Song CSV must have at least a header row and one data row');
    }
    
    const songs = lines.slice(1).map((line, index) => {
      // CSVパース：クォート内のカンマを考慮
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      // 最低4カラム必要
      if (values.length < 4) {
        console.warn(`Song row ${index + 2} has only ${values.length} columns, skipping`);
        return null;
      }
      
      return {
        id: Number(values[0]),
        name: values[1],
        center: values[2] as Idol,
        attribute: values[3] as "Cool" | "Smile" | "Pure",
      } as Song;
    }).filter((song): song is Song => song !== null);
    
    return songs;
  } catch (error) {
    console.error("Failed to fetch songs from CSV:", error);
    return [];
  }
};
