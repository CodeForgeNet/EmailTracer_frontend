import type { Hop } from '@/types/email';
import { format } from 'date-fns';

export default function Timeline({ hops }: { hops: Hop[] }) {
  return (
    <ol className="relative border-s pl-6">
      {hops.map((h) => (
        <li key={h.index} className="mb-6 ms-6">
          <span className="absolute -start-3 mt-1 h-5 w-5 rounded-full border bg-white"></span>
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="font-medium">
                {h.from} → {h.by}
              </div>
              <div className="text-sm text-gray-500">
                {format(new Date(h.timeIso), 'PPp')}
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              {h.with ? (
                <span className="mr-3">
                  with <span className="font-mono">{h.with}</span>
                </span>
              ) : null}
              {typeof h.delayMs === 'number' ? (
                <span>Δ {h.delayMs} ms</span>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
