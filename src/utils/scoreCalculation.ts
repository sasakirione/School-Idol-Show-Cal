import { Card, CenterAbility, Idol, Song, Status } from "@/types";

export interface EffectiveStats {
  smile: number;
  pure: number;
  cool: number;
  total: number;
}

/**
 * 実質ステータスを計算する関数
 * 楽曲と同じ属性のステータスはそのまま、それ以外は0.1倍
 */
export const calculateEffectiveStats = (
  cards: (Card | null)[],
  song: Song | null,
): EffectiveStats => {
  const validCards = cards.filter((card): card is Card => card !== null);
  const centerIdol = song?.center;
  const centerAbility =
    validCards.find((card) => card.idol === centerIdol)?.centerAbility ?? 0;

  if (validCards.length === 0 || !song) {
    return {
      smile: 0,
      pure: 0,
      cool: 0,
      total: 0,
    };
  }

  const baseStats: Status = validCards.reduce(
    (sum, card) => {
      const status = cardCalculate(card, centerAbility);
      return {
        smile: sum.smile + status.smile,
        pure: sum.pure + status.pure,
        cool: sum.cool + status.cool,
      };
    },
    { smile: 0, pure: 0, cool: 0 },
  );

  // 楽曲の属性に応じて実質ステータスを計算
  const effectiveStats = {
    smile: song.attribute === "Smile" ? baseStats.smile : baseStats.smile * 0.1,
    pure: song.attribute === "Pure" ? baseStats.pure : baseStats.pure * 0.1,
    cool: song.attribute === "Cool" ? baseStats.cool : baseStats.cool * 0.1,
  };

  const total =
    effectiveStats.smile + effectiveStats.pure + effectiveStats.cool;

  return {
    smile: Math.floor(effectiveStats.smile),
    pure: Math.floor(effectiveStats.pure),
    cool: Math.floor(effectiveStats.cool),
    total: Math.floor(total),
  };
};

const cardCalculate = (card: Card, centerAbility: CenterAbility): Status => {
  const magnification = getMagnification(centerAbility, card.idol);
  return {
    smile: card.smile * magnification,
    pure: card.pure * magnification,
    cool: card.cool * magnification,
  };
};

const getMagnification = (centerAbility: CenterAbility, idol: Idol) => {
  switch (centerAbility) {
    case 0:
      return 1;
    case 1:
      return 1.8;
    case 2:
      if (idol == "乙宗梢" || idol == "日野下花帆" || idol == "百生吟子") {
        return 3;
      }
      return 1;
    case 3:
      if (idol == "夕霧綴理" || idol == "村野さやか" || idol == "徒町小鈴") {
        return 3;
      }
      return 1;
    case 4:
      if (idol == "藤島慈" || idol == "大沢瑠璃乃" || idol == "安養寺姫芽") {
        return 3;
      }
      return 1;
    case 5:
      if (idol == "桂城泉" || idol == "セラス柳田リリエンフェルト") {
        return 3;
      }
      return 1;
  }
};
