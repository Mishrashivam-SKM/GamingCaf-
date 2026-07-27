import type { MockDatabaseSchema } from '../types/models';

export const defaultSeedData: MockDatabaseSchema = {
  settings: {
    theme: 'dark',
    currency: 'USD',
    taxRate: 0.08,
    storeName: 'OmniCommand HQ',
  },
  stations: [
    { id: 'st-01', name: 'PC-01', type: 'PC', status: 'AVAILABLE', specs: { cpu: 'i9-14900K', gpu: 'RTX 4090', ram: '64GB' } },
    { id: 'st-02', name: 'PC-02', type: 'PC', status: 'IN_USE', specs: { cpu: 'i9-14900K', gpu: 'RTX 4090', ram: '64GB' }, currentSessionId: 'sess-01' },
    { id: 'st-03', name: 'PC-03', type: 'PC', status: 'AVAILABLE', specs: { cpu: 'i7-13700K', gpu: 'RTX 4080', ram: '32GB' } },
    { id: 'st-04', name: 'PC-04', type: 'PC', status: 'MAINTENANCE', specs: { cpu: 'i7-13700K', gpu: 'RTX 4080', ram: '32GB' } },
    { id: 'st-05', name: 'PS5-01', type: 'CONSOLE', status: 'AVAILABLE' },
    { id: 'st-06', name: 'PS5-02', type: 'CONSOLE', status: 'RESERVED' },
    { id: 'st-07', name: 'VR-01', type: 'VR', status: 'AVAILABLE' },
    { id: 'st-08', name: 'SIM-01', type: 'RACING_SIM', status: 'IN_USE', currentSessionId: 'sess-02' },
  ],
  customers: [
    { id: 'cust-01', name: 'Alex Mercer', email: 'alex@example.com', phone: '+1 555 0101', loyaltyPoints: 1250, totalSpent: 450.00, membershipLevel: 'GOLD', joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), lastVisit: new Date().toISOString() },
    { id: 'cust-02', name: 'Sarah Connor', email: 'sarah@example.com', phone: '+1 555 0102', loyaltyPoints: 300, totalSpent: 85.50, membershipLevel: 'BRONZE', joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: 'cust-03', name: 'John Doe', email: 'john@example.com', loyaltyPoints: 0, totalSpent: 0, membershipLevel: 'BRONZE', joinedAt: new Date().toISOString() },
  ],
  sessions: [
    { id: 'sess-01', stationId: 'st-02', customerId: 'cust-01', startTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(), cost: 5.50, status: 'ACTIVE' },
    { id: 'sess-02', stationId: 'st-08', guestName: 'Guest 144', startTime: new Date(Date.now() - 15 * 60 * 1000).toISOString(), durationMinutes: 60, cost: 15.00, status: 'ACTIVE' },
    { id: 'sess-03', stationId: 'st-01', customerId: 'cust-02', startTime: new Date(Date.now() - 120 * 60 * 1000).toISOString(), endTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(), cost: 12.00, status: 'COMPLETED' },
  ],
  products: [
    { id: 'prod-01', name: 'Monster Energy', category: 'BEVERAGES', price: 3.50, stockCount: 45, barcode: '123456789012' },
    { id: 'prod-02', name: 'Red Bull', category: 'BEVERAGES', price: 4.00, stockCount: 30, barcode: '123456789013' },
    { id: 'prod-03', name: 'Doritos Nacho Cheese', category: 'SNACKS', price: 2.50, stockCount: 15, barcode: '123456789014' },
    { id: 'prod-04', name: '1 Hour PC Pass', category: 'PASSES', price: 5.00, stockCount: 999 },
    { id: 'prod-05', name: '3 Hour PC Pass', category: 'PASSES', price: 12.00, stockCount: 999 },
    { id: 'prod-06', name: 'Day Pass', category: 'PASSES', price: 25.00, stockCount: 999 },
    { id: 'prod-07', name: 'Gaming Mousepad', category: 'MERCHANDISE', price: 15.00, stockCount: 10 },
  ],
  orders: [
    { 
      id: 'ord-01', customerId: 'cust-01', subtotal: 3.50, tax: 0.28, discount: 0, total: 3.78, paymentMethod: 'CARD', status: 'COMPLETED', createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      items: [{ id: 'item-01', productId: 'prod-01', name: 'Monster Energy', quantity: 1, unitPrice: 3.50, totalPrice: 3.50 }] 
    }
  ],
  bookings: [
    { id: 'book-01', stationId: 'st-01', customerId: 'cust-01', customerName: 'Alex Mercer', startTime: new Date(Date.now() + 120 * 60 * 1000).toISOString(), endTime: new Date(Date.now() + 240 * 60 * 1000).toISOString(), status: 'CONFIRMED', source: 'WEBSITE' },
    { id: 'book-02', stationId: 'st-05', customerId: 'cust-02', customerName: 'Sarah Connor', startTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), endTime: new Date(Date.now() + 180 * 60 * 1000).toISOString(), status: 'PENDING', source: 'WHATSAPP' }
  ]
};
