import { pgTable, serial, varchar, text, timestamp, integer, decimal, boolean, date, time, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ========== TABELAS ==========

export const usuarios = pgTable('usuarios', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  senhaHash: varchar('senha_hash', { length: 255 }).notNull(),
  papel: varchar('papel', { length: 50 }).notNull().default('user'),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const eventos = pgTable('eventos', {
  id: serial('id').primaryKey(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  descricao: text('descricao'),
  dataInicio: date('data_inicio').notNull(),
  dataFim: date('data_fim').notNull(),
  local: varchar('local', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('rascunho'),
  criadoPor: integer('criado_por').references(() => usuarios.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const ingressos = pgTable('ingressos', {
  id: serial('id').primaryKey(),
  eventoId: integer('evento_id').references(() => eventos.id, { onDelete: 'cascade' }).notNull(),
  tipo: varchar('tipo', { length: 100 }).notNull(),
  preco: decimal('preco', { precision: 10, scale: 2 }).notNull(),
  quantidadeTotal: integer('quantidade_total').notNull(),
  vendidos: integer('vendidos').notNull().default(0),
  ativo: boolean('ativo').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ========== RELAÇÕES ==========

export const eventosRelations = relations(eventos, ({ many, one }) => ({
  ingressos: many(ingressos),
  criador: one(usuarios, {
    fields: [eventos.criadoPor],
    references: [usuarios.id],
  }),
}));

export const ingressosRelations = relations(ingressos, ({ one }) => ({
  evento: one(eventos, {
    fields: [ingressos.eventoId],
    references: [eventos.id],
  }),
}));

export const usuariosRelations = relations(usuarios, ({ many }) => ({
  eventos: many(eventos),
}));
