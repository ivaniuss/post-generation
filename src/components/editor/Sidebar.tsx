'use client';

import type { EditorState, FormatId, StyleId } from '@/lib/types';
import FormatPanel from './panels/FormatPanel';
import TextPanel from './panels/TextPanel';
import StylePanel from './panels/StylePanel';
import AdjustmentsPanel from './panels/AdjustmentsPanel';
import ColorPanel from './panels/ColorPanel';
import ImagePanel from './panels/ImagePanel';
import ExportPanel from './panels/ExportPanel';

interface SidebarProps {
  state: EditorState;
  onFormatChange: (v: FormatId) => void;
  onStyleChange: (v: StyleId) => void;
  onAccentColorChange: (v: string) => void;
  onKickerChange: (v: string) => void;
  onHeadlineChange: (v: string) => void;
  onSubtitleChange: (v: string) => void;
  onFontSizeChange: (v: number) => void;
  onOverlayChange: (v: number) => void;
  onVerticalPosChange: (v: number) => void;
  onHorizontalPosChange: (v: number) => void;
  onLetterSpacingChange: (v: number) => void;
  onImagesAdd: (imgs: string[]) => void;
  onImageRemove: (index: number) => void;
}

export default function Sidebar(props: SidebarProps) {
  return (
    <div className="w-full lg:w-[340px] flex flex-col gap-1.5">
      <FormatPanel current={props.state.format} onChange={props.onFormatChange} />
      <TextPanel
        kicker={props.state.kicker}
        headline={props.state.headline}
        subtitle={props.state.subtitle}
        onKickerChange={props.onKickerChange}
        onHeadlineChange={props.onHeadlineChange}
        onSubtitleChange={props.onSubtitleChange}
      />
      <StylePanel current={props.state.style} onChange={props.onStyleChange} />
      <AdjustmentsPanel
        fontSize={props.state.fontSize}
        overlay={props.state.overlay}
        verticalPos={props.state.verticalPos}
        horizontalPos={props.state.horizontalPos}
        letterSpacing={props.state.letterSpacing}
        onFontSizeChange={props.onFontSizeChange}
        onOverlayChange={props.onOverlayChange}
        onVerticalPosChange={props.onVerticalPosChange}
        onHorizontalPosChange={props.onHorizontalPosChange}
        onLetterSpacingChange={props.onLetterSpacingChange}
      />
      <ColorPanel current={props.state.accentColor} onChange={props.onAccentColorChange} />
      <ImagePanel
        images={props.state.images}
        onAdd={props.onImagesAdd}
        onRemove={props.onImageRemove}
      />
      <ExportPanel format={props.state.format} />
    </div>
  );
}
