'use client';

function vpLabel(v: number) {
  if (v <= 10) return 'Top';
  if (v <= 35) return 'Alto';
  if (v <= 65) return 'Mid';
  if (v <= 85) return 'Bajo';
  return 'Bottom';
}

function hpLabel(v: number) {
  return v < 30 ? 'Left' : v < 70 ? 'Center' : 'Right';
}

interface AdjustmentsPanelProps {
  fontSize: number;
  overlay: number;
  verticalPos: number;
  horizontalPos: number;
  letterSpacing: number;
  onFontSizeChange: (v: number) => void;
  onOverlayChange: (v: number) => void;
  onVerticalPosChange: (v: number) => void;
  onHorizontalPosChange: (v: number) => void;
  onLetterSpacingChange: (v: number) => void;
}

function RangeRow({
  label, value, display, min, max, step, onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="row">
      <span className="row-label" title={label}>{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="range"
      />
      <span className="valout">{display}</span>
    </div>
  );
}

export default function AdjustmentsPanel(props: AdjustmentsPanelProps) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="lbl">Adjustments</span>
        <span className="badge">Slide</span>
      </div>
      <div className="flex flex-col gap-2">
        <RangeRow
          label="Size"
          value={props.fontSize}
          display={String(props.fontSize)}
          min={24} max={86} step={2}
          onChange={props.onFontSizeChange}
        />
        <RangeRow
          label="Overlay"
          value={props.overlay}
          display={`${props.overlay}%`}
          min={0} max={88} step={4}
          onChange={props.onOverlayChange}
        />
        <RangeRow
          label="V. Pos"
          value={props.verticalPos}
          display={vpLabel(props.verticalPos)}
          min={0} max={100} step={5}
          onChange={props.onVerticalPosChange}
        />
        <RangeRow
          label="H. Pos"
          value={props.horizontalPos}
          display={hpLabel(props.horizontalPos)}
          min={0} max={100} step={5}
          onChange={props.onHorizontalPosChange}
        />
        <RangeRow
          label="Spacing"
          value={props.letterSpacing}
          display={props.letterSpacing.toFixed(1)}
          min={-2} max={8} step={0.5}
          onChange={props.onLetterSpacingChange}
        />
      </div>
    </div>
  );
}
