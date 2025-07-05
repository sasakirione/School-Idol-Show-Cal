export interface Card {
  id: number;
  name: string;
  series: string;
  idol: Idol;
  smile: number;
  pure: number;
  cool: number;
  rarity: "N" | "R" | "SR" | "SSR";
  attribute: Attribute;
  centerAbility: CenterAbility;
}

export interface CSVCard {
  id: number;
  rare: "N" | "R" | "SR" | "SSR" | "UR";
  series: string;
  name: string;
  idol: string;
  "120S": number;
  "120P": number;
  "120C": number;
  "120M": number;
  center1: CenterAbility;
}

export type CenterAbility = 0 | 1 | 2 | 3 | 4 | 5;

export const IDOLS = [
  "日野下花帆",
  "村野さやか",
  "大沢瑠璃乃",
  "乙宗梢",
  "夕霧綴理",
  "藤島慈",
  "百生吟子",
  "徒町小鈴",
  "安養寺姫芽",
  "セラス柳田リリエンフェルト",
  "桂城泉",
  "大賀美沙知",
] as const;
export type Idol = (typeof IDOLS)[number];

export interface Song {
  id: number;
  name: string;
  attribute: Attribute;
  center: Idol;
}

export type Difficulty = "NORMAL" | "HARD" | "EXPERT" | "MASTER";
export type Attribute = "Smile" | "Cool" | "Pure";

export type Status = {
  smile: number;
  pure: number;
  cool: number;
};
