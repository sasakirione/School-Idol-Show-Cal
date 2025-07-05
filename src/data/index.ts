import { Card } from "@/types";
import { fetchAndParseCSV, convertCSVCardToCard } from "@/utils/csv";

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
