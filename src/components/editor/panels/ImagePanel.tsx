'use client';

import { useRef, useCallback } from 'react';
import type { GridDirection } from '@/lib/types';

interface ImagePanelProps {
  images: string[];
  gridDirection: GridDirection;
  onDirectionChange: (dir: GridDirection) => void;
  onAdd: (imgs: string[]) => void;
  onRemove: (index: number) => void;
}

export default function ImagePanel({ images, gridDirection, onDirectionChange, onAdd, onRemove }: ImagePanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || !files.length) return;
    const readers: Promise<string>[] = [];
    for (const f of files) {
      readers.push(new Promise(resolve => {
        const r = new FileReader();
        r.onload = e => resolve(e.target?.result as string);
        r.readAsDataURL(f);
      }));
    }
    Promise.all(readers).then(onAdd);
  }, [onAdd]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = '';
  }, [handleFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <div className="card">
      <div className="card-header">
        <span className="lbl">Background</span>
        <span className="badge">{images.length} image{images.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="flex gap-1.5 mb-2">
        <button
          className={`flex-1 py-1.5 rounded-[var(--radius-sm)] text-[10px] font-semibold tracking-[.3px] text-center transition-all cursor-pointer border ${gridDirection === 'auto' ? 'bg-[var(--text-primary)] text-[var(--bg-page)] border-[var(--text-primary)]' : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'}`}
          onClick={() => onDirectionChange('auto')}
        >
          <svg className="inline-block mr-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
          </svg>
          Auto
        </button>
        <button
          className={`flex-1 py-1.5 rounded-[var(--radius-sm)] text-[10px] font-semibold tracking-[.3px] text-center transition-all cursor-pointer border ${gridDirection === 'horizontal' ? 'bg-[var(--text-primary)] text-[var(--bg-page)] border-[var(--text-primary)]' : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'}`}
          onClick={() => onDirectionChange('horizontal')}
        >
          <svg className="inline-block mr-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 12h18" />
          </svg>
          Horizontal
        </button>
        <button
          className={`flex-1 py-1.5 rounded-[var(--radius-sm)] text-[10px] font-semibold tracking-[.3px] text-center transition-all cursor-pointer border ${gridDirection === 'vertical' ? 'bg-[var(--text-primary)] text-[var(--bg-page)] border-[var(--text-primary)]' : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'}`}
          onClick={() => onDirectionChange('vertical')}
        >
          <svg className="inline-block mr-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M12 3v18" />
          </svg>
          Vertical
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {images.map((src, i) => (
          <div
            key={i}
            className="img-thumb group"
            style={{ backgroundImage: `url(${src})` }}
          >
            <button
              className="img-del"
              onClick={() => onRemove(i)}
              aria-label="Remove image"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button
        className="img-add-btn"
        onClick={() => inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add image
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}
