export interface Hop {
  index: number;
  from: string;
  by: string;
  timeIso: string;
  with?: string;
  delayMs?: number;
}

export interface Email {
  _id: string;
  subject: string;
  from: string;
  date: string;
  body: string;
  receivedChain: string[];
  senderESP: string;
  createdAt: string;
  updatedAt: string;
}
