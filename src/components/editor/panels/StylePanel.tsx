'use client';

import type { StyleId } from '@/lib/types';

const styleLabels: Record<StyleId, string> = {
  editorial: 'Editorial',
  impacto: 'Impact',
  minimal: 'Minimal',
  italic: 'Italic',
};

interface StylePanelProps {
  current: StyleId;
  onChange: (style: StyleId) => void;
}

export default function StylePanel({ current, onChange }: StylePanelProps) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="lbl">Font Style</span>
        <span className="badge">4 styles</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {(Object.keys(styleLabels) as StyleId[]).map(id => (
          <button
            key={id}
            className={`fs-btn${current === id ? ' on' : ''}`}
            onClick={() => onChange(id)}
          >
            {styleLabels[id]}
          </button>
        ))}
      </div>
    </div>
  );
}
