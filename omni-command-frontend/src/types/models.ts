export type StationType = 'PC' | 'CONSOLE' | 'VR' | 'RACING_SIM';
export type StationStatus = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'RESERVED' | 'OFFLINE';

export interface Station {
  id: string;
  name: string; // e.g., "PC-01"
  type: StationType;
  status: StationStatus;
  specs?: {
    cpu?: string;
    gpu?: string;
    ram?: string;
  };
  currentSessionId?: string;
}

export type SessionStatus = 'ACTIVE' | 'COMPLETED' | 'PAUSED';

export interface Session {
  id: string;
  stationId: string;
  customerId?: string; // Optional for anonymous guest sessions
  guestName?: string;
  startTime: string; // ISO String
  endTime?: string; // ISO String
  durationMinutes?: number; // Pre-paid duration, if applicable
  cost: number;
  status: SessionStatus;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  loyaltyPoints: number;
  totalSpent: number;
  membershipLevel: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  joinedAt: string; // ISO String
  lastVisit?: string;
}

export type ProductCategory = 'SNACKS' | 'BEVERAGES' | 'PASSES' | 'MERCHANDISE' | 'OTHER';

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: ProductCategory;
  stockCount: number;
  imageUrl?: string;
  barcode?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type PaymentMethod = 'CASH' | 'CARD' | 'UPI' | 'WALLET' | 'SPLIT';
export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';

export interface Order {
  id: string;
  customerId?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod?: PaymentMethod;
  status: OrderStatus;
  createdAt: string; // ISO string
}

export interface Settings {
  theme: 'dark' | 'light' | 'system';
  currency: string;
  taxRate: number;
  storeName: string;
}

export interface Booking {
  id: string;
  stationId: string;
  customerId: string;
  customerName: string;
  startTime: string; // ISO
  endTime: string; // ISO
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  source: 'WHATSAPP' | 'WEBSITE' | 'IN_PERSON';
}

export interface MockDatabaseSchema {
  stations: Station[];
  sessions: Session[];
  customers: Customer[];
  products: Product[];
  orders: Order[];
  settings: Settings;
  bookings: Booking[];
}
