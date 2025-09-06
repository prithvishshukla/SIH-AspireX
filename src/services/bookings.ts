import { storage } from '../lib/storage';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Booking {
  id: string;
  date: string; // ISO date e.g., 2025-01-10
  time: string; // e.g., '2:00 PM'
  therapyId: string;
  therapyName: string;
  practitioner: string;
  status: BookingStatus;
  patient?: string; // optional if viewed by practitioner
  notes?: string;
}

const KEY = 'app.bookings.v1';

function load(): Booking[] {
  return storage.get<Booking[]>(KEY, []);
}

function save(items: Booking[]) {
  storage.set(KEY, items);
}

export const bookingService = {
  getAll(): Booking[] {
    const items = load();
    // sort by date then time (assumes same locale format for display only)
    return items.slice().sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      if (da !== db) return da - db;
      // naive time sort: parse into 24h
      const to24 = (t: string) => {
        const m = t.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (!m) return 0;
        let hh = parseInt(m[1], 10);
        const mm = parseInt(m[2], 10);
        const ap = m[3].toUpperCase();
        if (ap === 'PM' && hh !== 12) hh += 12;
        if (ap === 'AM' && hh === 12) hh = 0;
        return hh * 60 + mm;
      };
      return to24(a.time) - to24(b.time);
    });
  },
  add(item: Booking) {
    const items = load();
    items.push(item);
    save(items);
  },
  remove(id: string) {
    const items = load().filter(b => b.id !== id);
    save(items);
  },
  updateStatus(id: string, status: BookingStatus) {
    const items = load().map(b => (b.id === id ? { ...b, status } : b));
    save(items);
  },
  clearAll() {
    save([]);
  },
};
