// src/components/ReceivingChain.tsx
import { formatDate } from '@/utils/dateFormatter';

interface ReceivedHop {
  source: string | null;
  destination: string | null;
  timestamp: string | null;
}

interface ReceivingChainProps {
  chain: ReceivedHop[];
}

export default function ReceivingChain({ chain }: ReceivingChainProps) {
  if (!chain || chain.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-600">
          No receiving chain information available.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>

      {chain.map((hop, index) => (
        <div key={index} className="relative pl-16 mb-8">
          {/* Timeline dot */}
          <div className="absolute left-6 transform -translate-x-1/2 w-5 h-5 rounded-full bg-blue-500 border-4 border-white"></div>

          <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
            <div className="flex flex-col md:flex-row md:justify-between mb-2">
              <h3 className="font-semibold text-blue-700">
                Hop {index + 1}: {hop.source || 'Unknown Source'}
              </h3>
              <span className="text-sm text-gray-500">
                {hop.timestamp ? formatDate(hop.timestamp) : 'Time unknown'}
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <span className="font-medium w-24">From:</span>
                <span className="text-gray-700">{hop.source || 'Unknown'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-24">To:</span>
                <span className="text-gray-700">
                  {hop.destination || 'Unknown'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
