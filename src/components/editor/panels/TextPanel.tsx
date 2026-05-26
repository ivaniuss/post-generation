'use client';

interface TextPanelProps {
  kicker: string;
  headline: string;
  subtitle: string;
  onKickerChange: (v: string) => void;
  onHeadlineChange: (v: string) => void;
  onSubtitleChange: (v: string) => void;
}

export default function TextPanel({
  kicker, headline, subtitle,
  onKickerChange, onHeadlineChange, onSubtitleChange,
}: TextPanelProps) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="lbl">Text</span>
        <span className="badge">kicker + headline + subtitle</span>
      </div>
      <div className="flex flex-col gap-1.5">
        <input
          className="inp"
          placeholder="Kicker (e.g. Premier League · 2025/26)"
          maxLength={80}
          value={kicker}
          onChange={e => onKickerChange(e.target.value)}
          style={{ fontSize: 10, letterSpacing: '.5px' }}
        />
        <textarea
          className="inp !min-h-16 resize-none font-serif font-bold"
          placeholder="Headline..."
          value={headline}
          onChange={e => onHeadlineChange(e.target.value)}
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 14 }}
        />
        <input
          className="inp"
          placeholder="Subtitle"
          maxLength={120}
          value={subtitle}
          onChange={e => onSubtitleChange(e.target.value)}
          style={{ fontSize: 11 }}
        />
      </div>
    </div>
  );
}
