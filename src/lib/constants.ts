import type { Format, FontStyle } from './types';

export const formats: Record<string, Format> = {
  story: {
    label: 'Story', ratio: '9:16', w: 240, h: 426,
    padT: 34, padB: 62, exportW: 1080, exportH: 1920,
  },
  square: {
    label: 'Square', ratio: '1:1', w: 240, h: 240,
    padT: 20, padB: 20, exportW: 1080, exportH: 1080,
  },
  portrait: {
    label: 'Portrait', ratio: '4:5', w: 240, h: 300,
    padT: 24, padB: 36, exportW: 1080, exportH: 1350,
  },
  landscape: {
    label: 'Landscape', ratio: '16:9', w: 360, h: 203,
    padT: 14, padB: 14, exportW: 1920, exportH: 1080,
  },
  cinema: {
    label: 'Cinema', ratio: '21:9', w: 420, h: 180,
    padT: 10, padB: 10, exportW: 2520, exportH: 1080,
  },
};

export const styles: Record<string, FontStyle> = {
  editorial: {
    font: "'Playfair Display', serif",
    weight: '900',
    transform: 'none',
    italic: false,
  },
  impacto: {
    font: "'Bebas Neue', sans-serif",
    weight: '400',
    transform: 'uppercase',
    italic: false,
  },
  minimal: {
    font: "'DM Sans', sans-serif",
    weight: '300',
    transform: 'none',
    italic: false,
  },
  italic: {
    font: "'Playfair Display', serif",
    weight: '700',
    transform: 'none',
    italic: true,
  },
};

export const accentColors = [
  '#ffffff',
  '#F5C518',
  '#ff4d4d',
  '#4ade80',
  '#60a5fa',
  '#e879f9',
  '#fb923c',
  '#000000',
];

export const defaultState = {
  format: 'story' as const,
  style: 'editorial' as const,
  accentColor: '#ffffff',
  kicker: 'Premier League · 2025/26',
  headline: 'Sobrevivieron por un hilo',
  subtitle: '',
  fontSize: 52,
  overlay: 52,
  verticalPos: 42,
  horizontalPos: 50,
  letterSpacing: 0,
  images: [] as string[],
};
