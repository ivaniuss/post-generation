'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import type { FormatId } from '@/lib/types';
import { formats } from '@/lib/constants';

interface ExportPanelProps {
  format: FormatId;
}

export default function ExportPanel({ format }: ExportPanelProps) {
  const [loading, setLoading] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleExport = async () => {
    const phoneEl = document.getElementById('phoneEl');
    if (!phoneEl) return;
    setLoading(true);
    const fmt = formats[format];
    try {
      const canvas = await html2canvas(phoneEl, {
        scale: 4.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        width: fmt.w,
        height: fmt.h,
        logging: false,
      });
      const a = document.createElement('a');
      a.download = `slide_${format}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    } catch (e) {
      console.error('Export error', e);
    }
    setLoading(false);
  };

  return (
    <button
      ref={btnRef}
      className="dl-btn"
      disabled={loading}
      onClick={handleExport}
    >
      {loading ? (
        <>
          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 11-6.219-8.56" />
          </svg>
          Generating…
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download PNG
        </>
      )}
    </button>
  );
}
