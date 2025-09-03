import EmailDashboard from '@/components/EmailDashboard';
import SendEmailForm from '@/components/SendEmailForm';
import { getEmailConfig } from '@/services/api';

export default async function HomePage() {
  const config = await getEmailConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center">
      <header className="py-8 px-4 w-full flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold text-blue-800 drop-shadow mb-4 tracking-tight text-center">
          LucidGrowth Email Tracker
        </h1>
        <p className="text-gray-600 text-lg max-w-xl text-center">
          Analyze email delivery, trace receiving chains, and test custom
          subjects with ease.
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-2 pb-8 w-full">
        <section className="mb-6 w-full flex flex-col items-center justify-center">
          <EmailDashboard />
        </section>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-200 w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
            Send Test Email
          </h2>
          <SendEmailForm
            emailAddress={config.email}
            defaultSubject={config.subject}
          />
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400 text-base w-full">
        &copy; {new Date().getFullYear()} LucidGrowth. All rights reserved.
      </footer>
    </div>
  );
}
