'use client';

import { useState, useCallback } from 'react';
import type { EditorState, FormatId, StyleId } from '@/lib/types';
import { defaultState } from '@/lib/constants';

export function useEditorState(initial = defaultState) {
  const [state, setState] = useState<EditorState>({ ...initial, images: [...initial.images] });

  const update = useCallback(<K extends keyof EditorState>(
    key: K,
    value: EditorState[K]
  ) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  const setFormat = useCallback((format: FormatId) => update('format', format), [update]);
  const setStyle = useCallback((style: StyleId) => update('style', style), [update]);
  const setAccentColor = useCallback((color: string) => update('accentColor', color), [update]);
  const setKicker = useCallback((v: string) => update('kicker', v), [update]);
  const setHeadline = useCallback((v: string) => update('headline', v), [update]);
  const setSubtitle = useCallback((v: string) => update('subtitle', v), [update]);
  const setFontSize = useCallback((v: number) => update('fontSize', v), [update]);
  const setOverlay = useCallback((v: number) => update('overlay', v), [update]);
  const setVerticalPos = useCallback((v: number) => update('verticalPos', v), [update]);
  const setHorizontalPos = useCallback((v: number) => update('horizontalPos', v), [update]);
  const setLetterSpacing = useCallback((v: number) => update('letterSpacing', v), [update]);

  const addImages = useCallback((newImages: string[]) => {
    setState(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
  }, []);

  const removeImage = useCallback((index: number) => {
    setState(prev => {
      const imgs = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: imgs };
    });
  }, []);

  const reset = useCallback(() => {
    setState({ ...defaultState, images: [] });
  }, []);

  return {
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
    addImages,
    removeImage,
    reset,
  };
}
