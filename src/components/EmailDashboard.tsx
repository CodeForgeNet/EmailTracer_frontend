'use client';

import React, { useEffect, useState } from 'react';
import { getLatestEmails } from '@/services/api';
import { formatDistanceToNow } from 'date-fns';
import { Email } from '@/types/email'; // Import the Email type

export default function EmailDashboard() {
  const [emails, setEmails] = useState<Email[]>([]); // Specify the type as Email[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Specify the type as string | null

  useEffect(() => {
    async function fetchEmails() {
      try {
        setLoading(true);
        const data = await getLatestEmails();
        setEmails(data.emails);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch emails:', err);
        setError('Failed to load recent emails');
        setLoading(false);
      }
    }

    fetchEmails();

    // Set up auto-refresh every minute
    const intervalId = setInterval(fetchEmails, 60000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading)
    return <div className="p-4 text-center">Loading recent emails...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-10 w-full max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-700 flex items-center gap-3">
        <span className="inline-block w-3 h-8 bg-blue-400 rounded-full"></span>
        Recent Emails
      </h2>

      {emails.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No emails found. Check your email configuration.
        </p>
      ) : (
        <div className="w-full overflow-x-auto">
          {' '}
          {/* Added overflow-x-auto here */}
          <div className="w-full overflow-y-auto max-h-[600px] border border-gray-200 rounded-2xl bg-white shadow-md">
            <table className="min-w-full divide-y divide-gray-200 text-base">
              {' '}
              {/* Added min-w-full */}
              <thead className="bg-blue-100">
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
