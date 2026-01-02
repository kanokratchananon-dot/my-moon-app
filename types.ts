
export enum AgeGroup {
  PRIMARY = 'Primary School (Age 6–11)',
  LOWER_SECONDARY = 'Lower Secondary (Age 12–14)',
  UPPER_SECONDARY = 'Upper Secondary (Age 15–18)'
}

export enum Category {
  CAREER_LEARNING = 'Career & Learning',
  LOVE_FRIENDSHIP = 'Love & Friendship',
  HEALTH_WELLBEING = 'Health & Well-being',
  LUCK_OPPORTUNITY = 'Luck & Opportunity'
}

export interface TarotCardData {
  name: string;
  meaning: string;
  guidance: string;
  thaiMeaning: string;
  thaiGuidance: string;
  visualPrompt: string;
  imageUrl?: string;
}

export interface CardTheme {
  id: string;
  name: string;
}
