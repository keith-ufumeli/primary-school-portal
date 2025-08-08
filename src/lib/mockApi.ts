import { v4 as uuidv4 } from "uuid";

// Types
export type Term = 1 | 2 | 3;
export type PaymentMethod = "Ecocash" | "Bank Transfer" | "Swipe" | "Cash";

export interface TeacherProfile {
  id: string;
  fullName: string;
  subject: string;
  phone: string;
  email: string;
}

export interface FeeInvoice {
  id: string;
  studentId: string;
  term: Term;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue" | "due";
}

export interface PaymentReceipt {
  id: string;
  invoiceId: string;
  studentId: string;
  paidAt: string;
  method: PaymentMethod;
  reference: string;
  amount: number;
}

export interface ReportCardSubjectRow {
  subject: string;
  grade: number; // 0-100
  teacher: string;
  comment?: string;
}

export interface ReportCard {
  id: string;
  studentId: string;
  studentName: string;
  gradeLevel: string;
  term: Term;
  year: number;
  overallComment: string;
  rows: ReportCardSubjectRow[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  type: "holiday" | "exam" | "meeting" | "sports" | "other";
}

// Storage helpers
const STORAGE_KEYS = {
  staff: "psp_staff",
  invoices: "psp_invoices",
  receipts: "psp_receipts",
  reportCards: "psp_report_cards",
  calendar: "psp_calendar",
};

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Seed data initializers
function ensureSeed() {
  // Seed staff
  const staff = readStorage<TeacherProfile[]>(STORAGE_KEYS.staff, []);
  if (staff.length === 0) {
    const seeded = [
      { id: uuidv4(), fullName: "Mr. Ndlovu", subject: "Mathematics", phone: "0772 000 000", email: "ndlovu@example.com" },
      { id: uuidv4(), fullName: "Ms. Chideme", subject: "Shona", phone: "0773 000 000", email: "chideme@example.com" },
    ];
    writeStorage(STORAGE_KEYS.staff, seeded);
  }

  // Seed calendar
  const calendar = readStorage<CalendarEvent[]>(STORAGE_KEYS.calendar, []);
  if (calendar.length === 0) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const seeded: CalendarEvent[] = [
      { id: uuidv4(), title: "First Day of Term", date: `${yyyy}-01-10`, type: "other" },
      { id: uuidv4(), title: "Mid-Term Break", date: `${yyyy}-03-15`, type: "holiday" },
      { id: uuidv4(), title: "End of Term Exams", date: `${yyyy}-04-20`, type: "exam" },
    ];
    writeStorage(STORAGE_KEYS.calendar, seeded);
  }

  // Seed empty containers for invoices/receipts/report cards if needed
  readStorage<FeeInvoice[]>(STORAGE_KEYS.invoices, []);
  readStorage<PaymentReceipt[]>(STORAGE_KEYS.receipts, []);
  readStorage<ReportCard[]>(STORAGE_KEYS.reportCards, []);
}

ensureSeed();

// Simulate latency
function delay<T>(value: T, ms = 500): Promise<T> {
  return new Promise((res) => setTimeout(() => res(value), ms));
}

// Staff APIs
export async function listStaff(): Promise<TeacherProfile[]> {
  const data = readStorage<TeacherProfile[]>(STORAGE_KEYS.staff, []);
  return delay(data);
}

export async function addStaff(profile: Omit<TeacherProfile, "id">): Promise<TeacherProfile> {
  const list = readStorage<TeacherProfile[]>(STORAGE_KEYS.staff, []);
  const created: TeacherProfile = { id: uuidv4(), ...profile };
  const updated = [...list, created];
  writeStorage(STORAGE_KEYS.staff, updated);
  return delay(created, 600);
}

export async function updateStaff(profile: TeacherProfile): Promise<TeacherProfile> {
  const list = readStorage<TeacherProfile[]>(STORAGE_KEYS.staff, []);
  const updated = list.map((s) => (s.id === profile.id ? profile : s));
  writeStorage(STORAGE_KEYS.staff, updated);
  return delay(profile, 600);
}

export async function deleteStaff(id: string): Promise<void> {
  const list = readStorage<TeacherProfile[]>(STORAGE_KEYS.staff, []);
  const updated = list.filter((s) => s.id !== id);
  writeStorage(STORAGE_KEYS.staff, updated);
  return delay(undefined, 400);
}

// Calendar APIs
export async function listCalendar(): Promise<CalendarEvent[]> {
  return delay(readStorage<CalendarEvent[]>(STORAGE_KEYS.calendar, []));
}

export async function createCalendarEvent(input: Omit<CalendarEvent, "id">): Promise<CalendarEvent> {
  const list = readStorage<CalendarEvent[]>(STORAGE_KEYS.calendar, []);
  const created: CalendarEvent = { id: uuidv4(), ...input };
  writeStorage(STORAGE_KEYS.calendar, [...list, created]);
  return delay(created, 300);
}

export async function updateCalendarEvent(event: CalendarEvent): Promise<CalendarEvent> {
  const list = readStorage<CalendarEvent[]>(STORAGE_KEYS.calendar, []);
  const updated = list.map((e) => (e.id === event.id ? event : e));
  writeStorage(STORAGE_KEYS.calendar, updated);
  return delay(event, 300);
}

export async function deleteCalendarEvent(id: string): Promise<void> {
  const list = readStorage<CalendarEvent[]>(STORAGE_KEYS.calendar, []);
  writeStorage(STORAGE_KEYS.calendar, list.filter((e) => e.id !== id));
  return delay(undefined, 200);
}

// Fees APIs
export async function listInvoicesByStudent(studentId: string): Promise<FeeInvoice[]> {
  const all = readStorage<FeeInvoice[]>(STORAGE_KEYS.invoices, []);
  return delay(all.filter((i) => i.studentId === studentId));
}

export async function upsertInvoice(invoice: FeeInvoice): Promise<FeeInvoice> {
  const all = readStorage<FeeInvoice[]>(STORAGE_KEYS.invoices, []);
  const exists = all.some((i) => i.id === invoice.id);
  const updated = exists ? all.map((i) => (i.id === invoice.id ? invoice : i)) : [...all, invoice];
  writeStorage(STORAGE_KEYS.invoices, updated);
  return delay(invoice, 500);
}

export async function makePayment(invoiceId: string, method: PaymentMethod): Promise<PaymentReceipt> {
  const invoices = readStorage<FeeInvoice[]>(STORAGE_KEYS.invoices, []);
  const invoice = invoices.find((i) => i.id === invoiceId);
  if (!invoice) throw new Error("Invoice not found");
  const receipt: PaymentReceipt = {
    id: uuidv4(),
    invoiceId,
    studentId: invoice.studentId,
    paidAt: new Date().toISOString(),
    method,
    reference: `${method}-${Math.floor(Math.random() * 1_000_000)}`,
    amount: invoice.amount,
  };
  const receipts = readStorage<PaymentReceipt[]>(STORAGE_KEYS.receipts, []);
  writeStorage(STORAGE_KEYS.receipts, [...receipts, receipt]);
  // also mark invoice paid
  const updatedInvoices = invoices.map((i) => (i.id === invoiceId ? { ...i, status: "paid" } : i));
  writeStorage(STORAGE_KEYS.invoices, updatedInvoices);
  return delay(receipt, 800);
}

export async function listReceipts(studentId: string): Promise<PaymentReceipt[]> {
  const all = readStorage<PaymentReceipt[]>(STORAGE_KEYS.receipts, []);
  return delay(all.filter((r) => r.studentId === studentId));
}

// Report card APIs
export async function listReportCards(studentId: string): Promise<ReportCard[]> {
  const all = readStorage<ReportCard[]>(STORAGE_KEYS.reportCards, []);
  return delay(all.filter((r) => r.studentId === studentId));
}

export async function createReportCard(input: Omit<ReportCard, "id">): Promise<ReportCard> {
  const all = readStorage<ReportCard[]>(STORAGE_KEYS.reportCards, []);
  const created: ReportCard = { id: uuidv4(), ...input };
  writeStorage(STORAGE_KEYS.reportCards, [...all, created]);
  return delay(created, 700);
}

export async function listFeeDefaulters(): Promise<FeeInvoice[]> {
  const invoices = readStorage<FeeInvoice[]>(STORAGE_KEYS.invoices, []);
  return delay(invoices.filter((i) => i.status === "pending" || i.status === "overdue" || i.status === "due"));
} 