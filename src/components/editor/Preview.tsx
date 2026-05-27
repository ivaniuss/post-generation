'use client';

import { useRef, useEffect, useState } from 'react';
import type { EditorState } from '@/lib/types';
import { formats, styles } from '@/lib/constants';

interface PreviewProps {
  state: EditorState;
}

export default function Preview({ state }: PreviewProps) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const fmt = formats[state.format];
  const s = styles[state.style];

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const cw = containerRef.current.clientWidth;
      setScale(cw < fmt.w ? cw / fmt.w : 1);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [fmt.w]);

  const topPx = fmt.padT + Math.round((fmt.h - fmt.padT - fmt.padB) * (state.verticalPos / 100) * 0.7);
  const maxHPad = fmt.w * 0.18;
  const leftPad = Math.round(10 + (state.horizontalPos / 100) * maxHPad);
  const rightPad = Math.round(10 + ((100 - state.horizontalPos) / 100) * maxHPad);
  const align = state.horizontalPos < 35 ? 'left' : state.horizontalPos < 65 ? 'center' : 'right';

  const hasImages = state.images.length > 0;

  const gridStyle = (() => {
    if (!hasImages) return {};
    const n = state.images.length;
    if (n === 1) return { gridTemplateColumns: '1fr', gridTemplateRows: '1fr' };
    if (state.gridDirection === 'vertical') {
      return {
        gridTemplateColumns: '1fr',
        gridTemplateRows: `repeat(${n}, 1fr)`,
      };
    }
    if (state.gridDirection === 'horizontal') {
      return {
        gridTemplateColumns: `repeat(${n}, 1fr)`,
        gridTemplateRows: '1fr',
      };
    }
    if (n === 2) return { gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr' };
    if (n === 3) return { gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gridTemplateAreas: '"a b" "a c"' };
    if (n === 4) return { gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr' };
    if (n <= 6) return { gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr' };
    return { gridTemplateColumns: '1fr 1fr 1fr 1fr', gridTemplateRows: 'auto' };
  })();

  const scaledH = fmt.h * scale;
  const heightDiff = fmt.h - scaledH;

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={containerRef} className="w-full max-w-[420px] flex justify-center">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            width: fmt.w,
            height: fmt.h,
            flexShrink: 0,
            marginBottom: -heightDiff,
          }}
        >
          <div
            ref={phoneRef}
            id="phoneEl"
            className="relative overflow-hidden rounded-none border-[3px] border-[#222] bg-black"
            style={{ width: fmt.w, height: fmt.h }}
          >
            <div
              className="absolute inset-0 grid overflow-hidden"
              style={hasImages ? gridStyle : { background: '#0a0a0a' }}
            >
              {hasImages ? (
                state.images.map((src, i) => {
                  let gridArea: string | undefined;
                  if (state.gridDirection === 'auto' && state.images.length === 3) {
                    if (i === 0) gridArea = 'a';
                    else if (i === 1) gridArea = 'b';
                    else gridArea = 'c';
                  }
                  return (
                    <div
                      key={i}
                      className="bg-cover bg-center"
                      style={{ backgroundImage: `url(${src})`, gridArea }}
                    />
                  );
                })
              ) : null}
            </div>
            <div
              className="absolute inset-0"
              style={{ background: `rgba(0,0,0,${state.overlay / 100})` }}
            />
            <div className="absolute inset-0 flex flex-col">
              <div style={{ height: fmt.padT, flexShrink: 0 }} />
              <div
                className="flex-1 flex flex-col"
                style={{
                  paddingLeft: leftPad,
                  paddingRight: rightPad,
                  paddingTop: topPx,
                  alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
                }}
              >
                {state.kicker && (
                  <div
                    className="text-[9px] font-medium tracking-[3px] uppercase mb-3"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: state.accentColor,
                      opacity: 0.8,
                      textShadow: '0 1px 2px rgba(0,0,0,.6), 0 2px 6px rgba(0,0,0,.3)',
                      textAlign: align,
                    }}
                  >
                    {state.kicker}
                  </div>
                )}
                <div
                  className="leading-[1.05] break-words"
                  style={{
                    fontFamily: s.font,
                    fontWeight: s.weight,
                    textTransform: s.transform as 'none' | 'uppercase',
                    fontStyle: s.italic ? 'italic' : 'normal',
                    fontSize: state.fontSize,
                    color: state.accentColor,
                    letterSpacing: state.letterSpacing,
                    textShadow: '0 1px 2px rgba(0,0,0,.6), 0 2px 8px rgba(0,0,0,.4), 0 4px 32px rgba(0,0,0,.5)',
                    textAlign: align,
                  }}
                >
                  {state.headline || ' '}
                </div>
                {state.subtitle && (
                  <div
                    className="text-[11px] leading-[1.3] mt-2.5 break-words"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      color: state.accentColor,
                      textShadow: '0 1px 2px rgba(0,0,0,.6), 0 2px 8px rgba(0,0,0,.35)',
                      textAlign: align,
                    }}
                  >
                    {state.subtitle}
                  </div>
                )}
                <div
                  className="h-[3px] w-10 mt-3.5 rounded-sm"
                  style={{
                    background: state.accentColor,
                    marginLeft: align === 'center' ? 'auto' : align === 'right' ? 'auto' : '0',
                    marginRight: align === 'center' ? 'auto' : align === 'left' ? 'auto' : '0',
                  }}
                />
              </div>
              <div style={{ height: fmt.padB, flexShrink: 0 }} />
            </div>
          </div>
        </div>
      </div>
      <span className="text-[10px] text-[#63636e] tracking-[.3px] text-center whitespace-nowrap">
        {fmt.label} · {fmt.ratio} · {fmt.exportW}×{fmt.exportH}
      </span>
    </div>
  );
}
