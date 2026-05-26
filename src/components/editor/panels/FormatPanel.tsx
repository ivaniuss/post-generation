'use client';

import type { FormatId } from '@/lib/types';
import { formats } from '@/lib/constants';

const formatIds: FormatId[] = ['story', 'square', 'portrait', 'landscape', 'cinema'];

interface FormatPanelProps {
  current: FormatId;
  onChange: (fmt: FormatId) => void;
}

export default function FormatPanel({ current, onChange }: FormatPanelProps) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="lbl">Format</span>
        <span className="badge">{formats[current].ratio}</span>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {formatIds.map(id => {
          const f = formats[id];
          return (
            <button
              key={id}
              className={`fmt-btn${current === id ? ' on' : ''}`}
              onClick={() => onChange(id)}
            >
              <span className="block text-[11px]">{f.ratio}</span>
              <span className="block text-[8px] text-[#63636e] font-normal mt-0.5">{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
