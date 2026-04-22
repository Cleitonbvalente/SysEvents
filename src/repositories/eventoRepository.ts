import { db } from '../config/database';
import { eventos } from '../schemas';
import { eq, desc } from 'drizzle-orm';

export class EventoRepository {
  async findAll() {
    return await db.select().from(eventos).orderBy(desc(eventos.createdAt));
  }

  async findById(id: number) {
    const result = await db.select().from(eventos).where(eq(eventos.id, id));
    return result[0];
  }

  async findByCriador(criadoPor: number) {
    return await db.select().from(eventos).where(eq(eventos.criadoPor, criadoPor));
  }

  async create(data: any) {
    const result = await db.insert(eventos).values(data).returning();
    return result[0];
  }

  async update(id: number, data: any) {
    const result = await db.update(eventos).set({ ...data, updatedAt: new Date() }).where(eq(eventos.id, id)).returning();
    return result[0];
  }

  async delete(id: number) {
    await db.delete(eventos).where(eq(eventos.id, id));
  }
}
