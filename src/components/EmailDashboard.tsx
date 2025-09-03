'use client';
// src/components/EmailDashboard.tsx
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Recent Emails</h2>

      {emails.length === 0 ? (
        <p className="text-gray-500">
          No emails found. Check your email configuration.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ESP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Received
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emails.map((email) => (
                <tr key={email._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {email.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{email.from}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {email.senderESP}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDistanceToNow(new Date(email.date), {
                      addSuffix: true,
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a
                      href={`/email/${email._id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
