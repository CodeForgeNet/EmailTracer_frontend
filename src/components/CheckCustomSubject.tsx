import { useState } from 'react';

type Email = {
  _id: string;
  subject: string;
  from: string;
  date: string;
  body: string;
  // add other fields as needed
};

export default function CheckCustomSubject() {
  const [subject, setSubject] = useState('');
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null); // New state for messages

  async function handleCheck() {
    setLoading(true);
    setMessage(null); // Clear previous messages
    setEmails([]); // Clear previous emails

    try {
      const res = await fetch(
        `http://localhost:3000/email/subject/${encodeURIComponent(subject)}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setEmails(data.emails);

      if (data.emails.length > 0) {
        let successMsg = `Success: Found ${data.emails.length} email(s) matching subject: "${subject}".`;
        if (data.emails.length > 1) {
          successMsg += ' Displaying metadata for all matched emails below.';
        }
        setMessage(successMsg);
      } else {
        setMessage(`Error: No emails found matching subject: "${subject}".`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`Error fetching emails: ${error.message}`);
      } else {
        setMessage(`An unknown error occurred while fetching emails.`);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 border rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Check Custom Subject</h3>
      <div className="flex mb-4">
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject to check"
          className="border px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCheck}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Subject'}
        </button>
      </div>

      {message && (
        <div
          className={`p-3 rounded mb-4 ${message.startsWith('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
        >
          {message}
        </div>
      )}

      {emails.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-medium mb-2">
            Matched Email(s) Details:
          </h4>
          <ul>
            {emails.map((email) => (
              <li
                key={email._id}
                className="mb-3 p-3 border border-blue-200 rounded-lg bg-blue-50 shadow-sm"
              >
                <p className="text-lg font-semibold text-blue-800 mb-1">
                  Subject: {email.subject}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>From:</strong> {email.from}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Date:</strong> {new Date(email.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
