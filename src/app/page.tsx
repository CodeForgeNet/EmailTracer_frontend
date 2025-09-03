// // import PageShell from '@/components/PageShell';
// // import ConfigCard from '@/components/ConfigCard';
// // import RecheckButton from '@/components/RecheckButton';
// // import LatestClient from './LatestClient';
// // // import ESPBadge from '@/components/ESPBadge';
// // // import ChainTable from '@/components/ChainTable';
// // // import Timeline from '@/components/Timeline';
// // // import RawHeaders from '@/components/RawHeaders';
// // // import { useLatestResult } from '@/lib/hooks';

// // export default function Page() {
// //   return (
// //     <PageShell title="Lucid Growth — Email Trace Dashboard">
// //       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
// //         <div className="lg:col-span-2 space-y-6">
// //           <LatestPanel />
// //         </div>
// //         <div className="space-y-6">
// //           <ConfigCard />
// //           <RecheckButton />
// //         </div>
// //       </div>
// //     </PageShell>
// //   );
// // }

// // function LatestPanel() {
// //   // client component boundary
// //   return <LatestClient />;
// // }

// // src/app/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { getEmailConfig } from '@/services/api';
// import Headers from '@/components/Headers';
// import EmailList from '@/components/EmailList';
// import SendEmailForm from '@/components/SendEmailForm';
// import Footer from '@/components/Footer';

// export default function Home() {
//   const [config, setConfig] = useState({ email: '', subject: '' });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadInitialData() {
//       try {
//         const configData = await getEmailConfig();
//         setConfig(configData);
//       } catch (error) {
//         console.error('Failed to load initial data:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadInitialData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Headers />

//       <main className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             Email Analysis Tool
//           </h2>
//           <p className="text-gray-600 mb-6">
//             Send an email to the address below with the specified subject line,
//             and our system will analyze its receiving chain and ESP type.
//           </p>

//           <SendEmailForm
//             emailAddress={config.email}
//             defaultSubject={config.subject}
//           />
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Recent Email Analyses
//             </h2>
//           </div>

//           <EmailList />
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// src/app/page.tsx
import EmailDashboard from '@/components/EmailDashboard';
import SendEmailForm from '@/components/SendEmailForm';
import { getEmailConfig } from '@/services/api';

export default async function HomePage() {
  const config = await getEmailConfig();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        LucidGrowth Email Tracker
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EmailDashboard />
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Send Test Email</h2>
            <SendEmailForm
              emailAddress={config.email}
              defaultSubject={config.subject}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
