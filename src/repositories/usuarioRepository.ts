import { db } from '../config/database';
import { usuarios } from '../schemas';
import { eq, ilike, and } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

export class UsuarioRepository {
  async findAll() {
    return await db.select().from(usuarios);
  }

  async findById(id: number) {
    const result = await db.select().from(usuarios).where(eq(usuarios.id, id));
    return result[0];
  }

  async findByEmail(email: string) {
    const result = await db.select().from(usuarios).where(eq(usuarios.email, email));
    return result[0];
  }

  async findWithPagination(page: number, limit: number, search?: string) {
    const offset = (page - 1) * limit;
    
    let whereClause: any;
    if (search && search.trim() !== '') {
      whereClause = ilike(usuarios.nome, `%${search}%`);
    }
    
    const query = db.select().from(usuarios);
    
    if (whereClause) {
      query.where(whereClause);
    }
    
    const data = await query.limit(limit).offset(offset).orderBy(usuarios.id);
    
    let countQuery = db.select({ count: sql<number>`count(*)` }).from(usuarios);
    if (whereClause) {
      countQuery.where(whereClause);
    }
    const totalResult = await countQuery;
    const total = Number(totalResult[0]?.count) || 0;
    
    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async create(data: any) {
    const result = await db.insert(usuarios).values(data).returning();
    return result[0];
  }

  async update(id: number, data: any) {
    const result = await db.update(usuarios)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(usuarios.id, id))
      .returning();
    return result[0];
  }

  async updateAvatar(id: number, avatarUrl: string) {
    const result = await db.update(usuarios)
      .set({ avatarUrl, updatedAt: new Date() })
      .where(eq(usuarios.id, id))
      .returning();
    return result[0];
  }

  async delete(id: number) {
    await db.delete(usuarios).where(eq(usuarios.id, id));
  }
}
