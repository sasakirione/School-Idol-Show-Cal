import { CSVCard, Card, Idol } from "@/types";

export const fetchCSVData = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.text();
};

export const parseCSVToCards = (csvText: string): CSVCard[] => {
  const lines = csvText.trim().split("\n");

  if (lines.length < 2) {
    throw new Error("CSV must have at least a header row and one data row");
  }

  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line, index) => {
    const values = line.split(",").map((v) => v.trim());

    if (values.length !== headers.length) {
      throw new Error(
        `Row ${index + 2} has ${values.length} columns, expected ${headers.length}`,
      );
    }

    const card: Record<string, string | number> = {};

    headers.forEach((header, colIndex) => {
      const value = values[colIndex];

      if (
        header === "id" ||
        header === "120S" ||
        header === "120P" ||
        header === "120C" ||
        header === "120M" ||
        header === "center1"
      ) {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) {
          throw new Error(
            `Invalid number in row ${index + 2}, column ${header}: ${value}`,
          );
        }
        card[header] = numValue;
      } else {
        card[header] = value;
      }
    });

    return card as unknown as CSVCard;
  });
};

export const fetchAndParseCSV = async (url: string): Promise<CSVCard[]> => {
  const csvText = await fetchCSVData(url);
  return parseCSVToCards(csvText);
};

const mapAttributeFromStats = (
  s: number,
  p: number,
  c: number,
): "Smile" | "Cool" | "Pure" => {
  if (s >= p && s >= c) return "Smile";
  if (p >= s && p >= c) return "Cool";
  return "Pure";
};

export const convertCSVCardToCard = (csvCard: CSVCard): Card => {
  return {
    id: csvCard.id,
    name: csvCard.name,
    series: csvCard.series,
    idol: csvCard.idol as Idol,
    smile: csvCard["120S"],
    pure: csvCard["120P"],
    cool: csvCard["120C"],
    rarity:
      csvCard.rare === "UR"
        ? "SSR"
        : (csvCard.rare as "N" | "R" | "SR" | "SSR"),
    attribute: mapAttributeFromStats(
      csvCard["120S"],
      csvCard["120P"],
      csvCard["120C"],
    ),
    centerAbility: csvCard.center1,
  };
};
