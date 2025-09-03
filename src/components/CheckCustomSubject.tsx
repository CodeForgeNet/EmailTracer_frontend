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

  async function handleCheck() {
    setLoading(true);
    const res = await fetch(
      `http://localhost:3000/email/subject/${encodeURIComponent(subject)}`
    );
    const data = await res.json();
    setEmails(data.emails);
    setLoading(false);
  }

  return (
    <div>
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject"
        className="border px-2 py-1 rounded"
      />
      <button
        onClick={handleCheck}
        className="ml-2 px-4 py-1 bg-blue-500 text-white rounded"
      >
        Check Custom Subject
      </button>
      {loading && <div>Loading...</div>}
      <ul>
        {emails.map((email) => (
          <li key={email._id}>
            <strong>{email.subject}</strong> - {email.from} - {email.date}
            <div>{email.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
