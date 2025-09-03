// src/components/EmailDetail.tsx
import ESPBadge from './ESPBadge';
import { formatDate } from '@/utils/dateFormatter';
import ReceivingChain from './ReceivingChain';
import { Email } from '@/types/email';

interface EmailDetailProps {
  email: Email;
}

export default function EmailDetail({ email }: EmailDetailProps) {
  // Parse receivedChain strings to objects
  const parsedChain = email.receivedChain.map((hop) => {
    try {
      return JSON.parse(hop);
    } catch (_) {
      return { source: 'Unknown', destination: 'Unknown', timestamp: null };
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {email.subject}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold">From:</span> {email.from}
          </div>
          <div>
            <span className="font-semibold">Date:</span>{' '}
            {formatDate(email.date)}
          </div>
          <div>
            <span className="font-semibold">ESP:</span>{' '}
            <ESPBadge esp={email.senderESP} />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Email Receiving Chain
        </h2>
        <ReceivingChain chain={parsedChain} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Email Content
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm text-gray-700">
          {email.body}
        </div>
      </div>
    </div>
  );
}
