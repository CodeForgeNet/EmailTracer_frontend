// import { EspInfo } from '../types/email';

// export default function ESPBadge({ esp }: { esp: EspInfo }) {
//   const pct = Math.round(esp.confidence * 100);
//   return (
//     <div className="flex items-center gap-3">
//       <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
//         {esp.name}
//       </span>
//       <div className="flex items-center gap-2">
//         <div className="h-2 w-28 overflow-hidden rounded bg-gray-200">
//           <div className="h-2 bg-blue-600" style={{ width: `${pct}%` }} />
//         </div>
//         <span className="text-sm text-gray-600">{pct}%</span>
//       </div>
//     </div>
//   );
// }

// src/components/ESPBadge.tsx
interface ESPBadgeProps {
  esp: string;
}

export default function ESPBadge({ esp }: ESPBadgeProps) {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';

  switch (esp?.toLowerCase()) {
    case 'gmail':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    case 'microsoft':
    case 'outlook':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'yahoo':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-800';
      break;
    case 'amazon ses':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'sendgrid':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'mailchimp':
      bgColor = 'bg-indigo-100';
      textColor = 'text-indigo-800';
      break;
    default:
    // Keep default colors
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {esp || 'Unknown'}
    </span>
  );
}
