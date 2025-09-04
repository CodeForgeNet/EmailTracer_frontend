import React, { useEffect, useState } from 'react';
import { Email } from '../types/email';
import { getAllEmails, getEmailsBySubject } from '../services/api';
import EmailDetail from './EmailDetail';

const EmailList: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [subjectInput, setSubjectInput] = useState<string>('');
  const [filteredSubject, setFilteredSubject] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      setError(null);
      console.log('Fetching emails...');
      console.log('Filtered Subject:', filteredSubject);
      try {
        let data;
        if (filteredSubject) {
          data = await getEmailsBySubject(filteredSubject);
        } else {
          data = await getAllEmails();
        }
        console.log('API Response Data:', data);
        setEmails(data.emails);
      } catch (err) {
        setError('Failed to fetch emails.');
        console.error('Error fetching emails:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [filteredSubject]);

  const handleCheckCustomSubject = () => {
    setFilteredSubject(subjectInput);
  };

  const handleClearFilter = () => {
    setSubjectInput('');
    setFilteredSubject(null);
  };

  if (loading) {
    return <div className="text-center py-4">Loading emails...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Email Dashboard</h1>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">
          Filter Emails by Subject
        </h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Enter subject..."
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCheckCustomSubject}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Check Custom Subject
          </button>
          {filteredSubject && (
            <button
              onClick={handleClearFilter}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emails && emails.length > 0 ? (
          emails.map((email) => <EmailDetail key={email._id} email={email} />)
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No emails found.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailList;
