export type FormatId = 'story' | 'square' | 'portrait' | 'landscape' | 'cinema';
export type StyleId = 'editorial' | 'impacto' | 'minimal' | 'italic';

export interface Format {
  label: string;
  ratio: string;
  w: number;
  h: number;
  padT: number;
  padB: number;
  exportW: number;
  exportH: number;
}

export interface FontStyle {
  font: string;
  weight: string;
  transform: string;
  italic: boolean;
}

export type GridDirection = 'auto' | 'horizontal' | 'vertical';

export interface EditorState {
  format: FormatId;
  style: StyleId;
  accentColor: string;
  kicker: string;
  headline: string;
  subtitle: string;
  fontSize: number;
  overlay: number;
  verticalPos: number;
  horizontalPos: number;
  letterSpacing: number;
  images: string[];
  gridDirection: GridDirection;
}
