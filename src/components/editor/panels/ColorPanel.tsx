'use client';

import { accentColors } from '@/lib/constants';

interface ColorPanelProps {
  current: string;
  onChange: (color: string) => void;
}

export default function ColorPanel({ current, onChange }: ColorPanelProps) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="lbl">Accent Color</span>
        <span className="badge">8 colors</span>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        {accentColors.map(c => (
          <button
            key={c}
            className={`ac-dot${current === c ? ' on' : ''}`}
            style={{
              background: c,
              borderColor: c === '#ffffff' || c === '#000000' ? '#555' : undefined,
            }}
            onClick={() => onChange(c)}
            aria-label={`Color ${c}`}
          />
        ))}
      </div>
    </div>
  );
}
