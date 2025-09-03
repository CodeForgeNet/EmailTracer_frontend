// src/app/email/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getEmailById, Email } from '@/services/api';
import Headers from '@/components/Headers';
import Footer from '@/components/Footer';
import EmailDetail from '@/components/EmailDetail';

export default function EmailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [email, setEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEmail() {
      try {
        const emailData = await getEmailById(id as string);
        setEmail(emailData);
      } catch (error) {
        console.error('Failed to load email:', error);
        setError('Failed to load email details');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadEmail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Headers />
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Headers />
      <main className="container mx-auto px-4 py-8">
        {email && <EmailDetail email={email} />}
        <div className="mt-6">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            Back to List
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
