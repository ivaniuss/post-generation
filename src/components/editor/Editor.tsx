'use client';

import { useEditorState } from '@/hooks/useEditorState';
import Sidebar from './Sidebar';
import Preview from './Preview';

export default function Editor() {
  const {
    state,
    setFormat,
    setStyle,
    setAccentColor,
    setKicker,
    setHeadline,
    setSubtitle,
    setFontSize,
    setOverlay,
    setVerticalPos,
    setHorizontalPos,
    setLetterSpacing,
    setGridDirection,
    addImages,
    removeImage,
    reset,
  } = useEditorState();

  return (
    <div className="flex flex-col gap-6 lg:gap-8 w-full max-w-6xl mx-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-[var(--text-primary)]">
            Post Generation
          </h1>
          <p className="text-[10px] text-[var(--text-tertiary)] tracking-wide">
            Premium Slide Editor
          </p>
        </div>
        <button
          onClick={reset}
          className="text-[10px] font-medium text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors tracking-wide uppercase px-3 py-1.5 rounded-md border border-[var(--border)] hover:border-[var(--border-hover)]"
        >
          Reset
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start lg:justify-center">
        <div className="lg:order-2 lg:sticky lg:top-6 flex-shrink-0">
          <Preview state={state} />
        </div>
        <Sidebar
          state={state}
          onFormatChange={setFormat}
          onStyleChange={setStyle}
          onAccentColorChange={setAccentColor}
          onKickerChange={setKicker}
          onHeadlineChange={setHeadline}
          onSubtitleChange={setSubtitle}
          onFontSizeChange={setFontSize}
          onOverlayChange={setOverlay}
          onVerticalPosChange={setVerticalPos}
          onHorizontalPosChange={setHorizontalPos}
          onLetterSpacingChange={setLetterSpacing}
          onGridDirectionChange={setGridDirection}
          onImagesAdd={addImages}
          onImageRemove={removeImage}
        />
      </div>
    </div>
  );
}
