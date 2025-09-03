'use client';
// src/components/SendEmailForm.tsx
import { useState } from 'react';
import { triggerRecheck } from '@/services/api';

interface SendEmailFormProps {
  emailAddress: string;
  defaultSubject: string;
}

export default function SendEmailForm({
  emailAddress,
  defaultSubject,
}: SendEmailFormProps) {
  const [customSubject, setCustomSubject] = useState('');
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<null | {
    type: 'success' | 'error';
    message: string;
  }>(null);

  const handleRecheck = async () => {
    setChecking(true);
    setStatus(null);

    try {
      const subject = customSubject || defaultSubject;
      const result = await triggerRecheck(subject);
      setStatus({
        type: 'success',
        message: `Recheck completed. Found ${result.found} emails with subject "${result.subject}".`,
      });
    } catch (_) {
      setStatus({
        type: 'error',
        message: 'Failed to trigger recheck. Please try again.',
      });
    } finally {
      setChecking(false);
    }
  };

  const uniqueSubject = customSubject || defaultSubject;
  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(uniqueSubject)}`;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-700 mb-2">
          Test Email Instructions
        </h3>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700">
          <li>
            Send an email to:{' '}
            <span className="font-mono bg-white px-2 py-0.5 rounded">
              {emailAddress}
            </span>
          </li>
          <li>
            Use subject:{' '}
            <span className="font-mono bg-white px-2 py-0.5 rounded">
              {uniqueSubject}
            </span>
          </li>
          <li>
            Click &quot;Check Now&quot; button after sending to analyze your
            email
          </li>
        </ol>
        <div className="mt-4">
          <a
            href={mailtoLink}
            className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Open Email Client
          </a>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-700 mb-3">
          Custom Subject (Optional)
        </h3>
        <div className="flex space-x-4">
          <input
            type="text"
            value={customSubject}
            onChange={(e) => setCustomSubject(e.target.value)}
            placeholder={defaultSubject}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleRecheck}
            disabled={checking}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors disabled:bg-green-300"
          >
            {checking ? 'Checking...' : 'Check Custom Subject'}
          </button>
        </div>

        {status && (
          <div
            className={`mt-4 p-3 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
