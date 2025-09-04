import { Email } from '@/types/email';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://lucidgrowth-backend-ijm7.onrender.com'
    : 'http://localhost:3000');

export interface EmailConfig {
  email: string;
  subject: string;
}

export interface RecheckResult {
  found: number;
  subject: string;
}

export async function getEmailConfig(): Promise<EmailConfig> {
  const response = await fetch(`${API_BASE_URL}/email/config`);
  if (!response.ok) {
    throw new Error('Failed to fetch email configuration');
  }
  return response.json();
}

export async function getAllEmails(): Promise<{
  count: number;
  emails: Email[];
}> {
  const response = await fetch(`${API_BASE_URL}/email/all`);
  if (!response.ok) {
    throw new Error('Failed to fetch all emails');
  }
  return response.json();
}

export async function getEmailById(id: string): Promise<Email> {
  const response = await fetch(`${API_BASE_URL}/email/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch email details');
  }
  return response.json();
}

export async function triggerEmailCheck(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/email/check`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to trigger email check');
  }
  // No specific return value is used, so we don't need to parse JSON
}

export async function triggerRecheck(subject?: string): Promise<RecheckResult> {
  const url = subject
    ? `${API_BASE_URL}/email/recheck?subject=${encodeURIComponent(subject)}`
    : `${API_BASE_URL}/email/recheck`;

  const response = await fetch(url, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to trigger recheck');
  }
  return response.json();
}

export async function getEmailsBySubject(subject: string): Promise<{
  count: number;
  emails: Email[];
}> {
  const response = await fetch(
    `${API_BASE_URL}/email/subject/${encodeURIComponent(subject)}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch emails by subject');
  }
  return response.json();
}
