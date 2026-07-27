import { useQuery } from './useQuery';
import { db } from '../../services/db';
import type { Booking } from '../../types/models';

export function useBookings() {
  return useQuery<Booking[]>(['bookings'], () => db.get('bookings'));
}
