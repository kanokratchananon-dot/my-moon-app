
import { Category, CardTheme } from './types';

export const CARD_THEMES: Record<Category, CardTheme[]> = {
  [Category.CAREER_LEARNING]: [
    { id: 'scholar', name: 'The Bright Scholar' },
    { id: 'creator', name: 'The Inspired Creator' },
    { id: 'explorer', name: 'The Brave Explorer' },
    { id: 'builder', name: 'The Master Builder' },
    { id: 'thinker', name: 'The Deep Thinker' },
    { id: 'presenter', name: 'The Shining Speaker' },
    { id: 'teamplayer', name: 'The Helpful Partner' },
    { id: 'persistent', name: 'The Steady Mountain' },
    { id: 'joyful', name: 'The Happy Learner' },
    { id: 'solver', name: 'The Puzzle Master' },
  ],
  [Category.LOVE_FRIENDSHIP]: [
    { id: 'kindheart', name: 'The Golden Heart' },
    { id: 'loyal', name: 'The True Companion' },
    { id: 'listener', name: 'The Gentle Ear' },
    { id: 'joybringer', name: 'The Laughter Spreader' },
    { id: 'inclusive', name: 'The Warm Circle' },
    { id: 'peacemaker', name: 'The Calm Dove' },
    { id: 'secret', name: 'The Trusted Bridge' },
    { id: 'support', name: 'The Holding Hand' },
    { id: 'companion', name: 'The Quiet Friend' },
    { id: 'openmind', name: 'The Sunlight Bloom' },
  ],
  [Category.HEALTH_WELLBEING]: [
    { id: 'leaf', name: 'The Resting Leaf' },
    { id: 'breather', name: 'The Deep Breath' },
    { id: 'energized', name: 'The Sparking Spirit' },
    { id: 'mindful', name: 'The Calm Pond' },
    { id: 'balanced', name: 'The Flying Kite' },
    { id: 'selfcare', name: 'The Growing Garden' },
    { id: 'quiet', name: 'The Moonbeam' },
    { id: 'healthy', name: 'The Fresh Apple' },
    { id: 'strong', name: 'The Oak Tree' },
    { id: 'peaceful', name: 'The Soft Pillow' },
  ],
  [Category.LUCK_OPPORTUNITY]: [
    { id: 'gem', name: 'The Hidden Gem' },
    { id: 'door', name: 'The Open Door' },
    { id: 'chance', name: 'The Shooting Star' },
    { id: 'luckystar', name: 'The North Star' },
    { id: 'freshstart', name: 'The First Sprout' },
    { id: 'gift', name: 'The Unexpected Joy' },
    { id: 'brave', name: 'The Golden Path' },
    { id: 'sunnypath', name: 'The Rainbow Bridge' },
    { id: 'feather', name: 'The Light Feather' },
    { id: 'well', name: 'The Wishing Well' },
  ],
};

export const UI_COLORS = {
  primary: '#FF69B4', // Hot Pink
  secondary: '#00FFFF', // Electric Cyan
  accent: '#E0E0E0', // Chrome/Silver
  text: '#FFFFFF',
  bg: '#0A0A0A'
};
export const OFFLINE_MESSAGES = {
  study: [
    "วันนี้คุณก้าวหน้า แม้จะทีละนิดก็มีความหมาย",
    "ความตั้งใจของคุณกำลังสร้างอนาคตที่ดี",
    "อย่าเร่งตัวเองเกินไป คุณทำได้ดีแล้ว"
  ],
  love: [
    "คุณเป็นเพื่อนที่มีคุณค่าและจริงใจ",
    "ความเข้าใจเริ่มจากการฟังกันด้วยใจ",
    "การเคารพตัวเองทำให้ความสัมพันธ์แข็งแรง"
  ],
  health: [
    "วันนี้เหมาะกับการพักใจและดูแลร่างกาย",
    "การพักผ่อนคือพลัง ไม่ใช่ความอ่อนแอ",
    "ฟังร่างกายตัวเอง แล้วคุณจะรู้จังหวะที่พอดี"
  ],
  luck: [
    "โอกาสเล็ก ๆ กำลังเข้ามา ถ้าคุณเปิดใจ",
    "ความตั้งใจดีจะพาเรื่องดี ๆ มาให้",
    "วันนี้เหมาะกับการเริ่มต้นใหม่อย่างอ่อนโยน"
  ]
}
