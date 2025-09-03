'use client';
import { useState } from 'react';

export default function RawHeaders({ headers }: { headers: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-3"
      >
        <span className="text-left text-lg font-medium">Raw Headers</span>
        <span className="text-sm text-gray-600">{open ? 'Hide' : 'Show'}</span>
      </button>
      {open && (
        <pre className="max-h-96 overflow-auto border-t bg-gray-50 p-4 text-xs leading-relaxed">
          {headers}
        </pre>
      )}
    </div>
  );
}
