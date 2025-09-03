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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Destination
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {chain.map((hop, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {hop.source || 'Unknown'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {hop.destination || 'Unknown'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {hop.timestamp ? formatDate(hop.timestamp) : 'Time unknown'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
