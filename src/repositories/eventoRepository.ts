import { db } from '../config/database';
import { eventos } from '../schemas';
import { eq, desc, ilike, and } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

export class EventoRepository {
  async findAll() {
    return await db.select().from(eventos).orderBy(desc(eventos.createdAt));
  }

  async findAllWithFilters(filters: {
    status?: string;
    local?: string;
    categoria?: string;
    dataInicio?: Date;
    dataFim?: Date;
    page?: number;
    limit?: number;
  }) {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    // Construir condições
    const conditions: any[] = [];

    // Filtro por status
    if (filters.status && filters.status !== 'todos') {
      conditions.push(eq(eventos.status, filters.status));
    }

    // Filtro por local (busca parcial)
    if (filters.local) {
      conditions.push(ilike(eventos.local, `%${filters.local}%`));
    }

    // Filtro por data de início
    if (filters.dataInicio) {
      conditions.push(sql`${eventos.dataInicio} >= ${filters.dataInicio}`);
    }

    // Filtro por data de fim
    if (filters.dataFim) {
      conditions.push(sql`${eventos.dataFim} <= ${filters.dataFim}`);
    }

    // Buscar dados paginados
    let data;
    if (conditions.length > 0) {
      data = await db.select()
        .from(eventos)
        .where(and(...conditions))
        .orderBy(desc(eventos.createdAt))
        .limit(limit)
        .offset(offset);
    } else {
      data = await db.select()
        .from(eventos)
        .orderBy(desc(eventos.createdAt))
        .limit(limit)
        .offset(offset);
    }

    // Buscar total de registros
    let total = 0;
    if (conditions.length > 0) {
      const countResult = await db.select({ count: sql<number>`count(*)` })
        .from(eventos)
        .where(and(...conditions));
      total = Number(countResult[0]?.count) || 0;
    } else {
      const countResult = await db.select({ count: sql<number>`count(*)` })
        .from(eventos);
      total = Number(countResult[0]?.count) || 0;
    }

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
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
    const result = await db.update(eventos)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(eventos.id, id))
      .returning();
    return result[0];
  }

  async updateStatus(id: number, status: string) {
    const result = await db.update(eventos)
      .set({ status, updatedAt: new Date() })
      .where(eq(eventos.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    await db.delete(eventos).where(eq(eventos.id, id));
  }
}

