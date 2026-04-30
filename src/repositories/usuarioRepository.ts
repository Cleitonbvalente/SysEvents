import { db } from '../config/database';
import { usuarios } from '../schemas';
import { eq } from 'drizzle-orm';

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

  async create(data: any) {
    const result = await db.insert(usuarios).values(data).returning();
    return result[0];
  }

  async update(id: number, data: any) {
    const result = await db.update(usuarios).set({ ...data, updatedAt: new Date() }).where(eq(usuarios.id, id)).returning();
    return result[0];
  }

  async delete(id: number) {
    await db.delete(usuarios).where(eq(usuarios.id, id));
  }

  async updateAvatar(id: number, avatarUrl: string) {
  const result = await db.update(usuarios)
    .set({ avatarUrl, updatedAt: new Date() })
    .where(eq(usuarios.id, id))
    .returning();
  return result[0];
  }
}
