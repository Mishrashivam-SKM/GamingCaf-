import type { MockDatabaseSchema } from '../types/models';
import { defaultSeedData } from './seedData';

const DB_KEY = 'omni_command_db';

export class MockDB {
  private data: MockDatabaseSchema;

  constructor() {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
      try {
        this.data = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse local storage db, using seed data', e);
        this.data = defaultSeedData;
        this.save();
      }
    } else {
      this.data = defaultSeedData;
      this.save();
    }
  }

  private save() {
    localStorage.setItem(DB_KEY, JSON.stringify(this.data));
  }

  // Simulate network delay
  private async delay(ms: number = 300) {
    // Random delay between ms and ms * 2
    const actualDelay = ms + Math.random() * ms;
    return new Promise(resolve => setTimeout(resolve, actualDelay));
  }

  // Generic CRUD
  async get<K extends keyof MockDatabaseSchema>(table: K): Promise<MockDatabaseSchema[K]> {
    await this.delay();
    return this.data[table];
  }

  async getById<K extends keyof MockDatabaseSchema>(table: K, id: string): Promise<any> {
    await this.delay();
    const items = this.data[table] as any[];
    return items.find(item => item.id === id);
  }

  async create<K extends keyof MockDatabaseSchema>(table: K, item: any): Promise<any> {
    await this.delay(500); // Create takes a bit longer
    const newItem = { ...item, id: `${table.toString().slice(0, 4)}-${Date.now()}` };
    (this.data[table] as any[]).push(newItem);
    this.save();
    return newItem;
  }

  async update<K extends keyof MockDatabaseSchema>(table: K, id: string, updates: any): Promise<any> {
    await this.delay();
    const items = this.data[table] as any[];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) throw new Error(`Item with id ${id} not found in ${table}`);
    
    items[index] = { ...items[index], ...updates };
    this.save();
    return items[index];
  }

  async delete<K extends keyof MockDatabaseSchema>(table: K, id: string): Promise<boolean> {
    await this.delay();
    const items = this.data[table] as any[];
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;
    
    items.splice(index, 1);
    this.save();
    return true;
  }

  // Specialized queries
  async getSettings() {
    await this.delay(100);
    return this.data.settings;
  }

  async updateSettings(settings: any) {
    await this.delay(300);
    this.data.settings = { ...this.data.settings, ...settings };
    this.save();
    return this.data.settings;
  }
  
  async resetDatabase() {
    await this.delay(500);
    this.data = defaultSeedData;
    this.save();
  }
}

// Singleton instance
export const db = new MockDB();
