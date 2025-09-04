'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { getAllEmails } from '@/services/api';
import { formatDistanceToNow } from 'date-fns';
import { Email } from '@/types/email';

export default function EmailDashboard() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllEmails();
      setEmails(data.emails);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch emails:', err);
      setError('Failed to load emails');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  if (loading && emails.length === 0) {
    return <div className="p-4 text-center">Loading emails...</div>;
  }

  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-10 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-3">
          <span className="inline-block w-3 h-8 bg-blue-400 rounded-full"></span>
          All Emails
        </h2>
        <button
          onClick={fetchEmails}
          disabled={loading}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {emails.length === 0 && !loading ? (
        <p className="text-gray-500 text-center py-8">
          No emails found. Check your email configuration.
        </p>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="w-full overflow-y-auto max-h-[600px] border border-gray-200 rounded-2xl bg-white shadow-md">
            <table className="min-w-full divide-y divide-gray-200 text-base">
              <thead className="sticky top-0 z-10 bg-blue-100 ">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700 uppercase tracking-wide">
                    Subject
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                    From
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                    ESP
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                    Received
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {emails.map((email) => (
                  <tr
                    key={email._id}
                    className="hover:bg-blue-50 transition duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                      {email.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {email.from}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {email.senderESP}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {formatDistanceToNow(new Date(email.date), {
                        addSuffix: true,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`/email/${email._id}`}
                        className="text-indigo-600 hover:text-indigo-900 font-semibold underline underline-offset-2"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
