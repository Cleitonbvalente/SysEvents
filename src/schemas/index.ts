import { pgTable, serial, varchar, text, timestamp, integer, decimal, boolean, date, time, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ENTIDADE USUÁRIO
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

// ENTIDADE EVENTO
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

// ENTIDADE PROGRAMAÇÃO (um-para-muitos com Evento)
export const programacoes = pgTable('programacoes', {
  id: serial('id').primaryKey(),
  eventoId: integer('evento_id').references(() => eventos.id, { onDelete: 'cascade' }).notNull(),
  titulo: varchar('titulo', { length: 255 }).notNull(),
  descricao: text('descricao'),
  data: date('data').notNull(),
  horarioInicio: time('horario_inicio').notNull(),
  horarioFim: time('horario_fim').notNull(),
  sala: varchar('sala', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ENTIDADE PALESTRANTE
export const palestrantes = pgTable('palestrantes', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
  bio: text('bio'),
  email: varchar('email', { length: 255 }).notNull().unique(),
  fotoUrl: varchar('foto_url', { length: 500 }),
  linkedin: varchar('linkedin', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// RELACIONAMENTO MUITOS-PARA-MUITOS: Evento <-> Palestrante
export const eventoPalestrantes = pgTable('evento_palestrantes', {
  eventoId: integer('evento_id').references(() => eventos.id, { onDelete: 'cascade' }).notNull(),
  palestranteId: integer('palestrante_id').references(() => palestrantes.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.eventoId, table.palestranteId] }),
}));

// ENTIDADE INGRESSO (um-para-muitos com Evento)
export const ingressos = pgTable('ingressos', {
  id: serial('id').primaryKey(),
  eventoId: integer('evento_id').references(() => eventos.id, { onDelete: 'cascade' }).notNull(),
  tipo: varchar('tipo', { length: 100 }).notNull(),
  preco: decimal('preco', { precision: 10, scale: 2 }).notNull(),
  quantidadeTotal: integer('quantidade_total').notNull(),
  vendidos: integer('vendidos').notNull().default(0),
  dataLimiteVenda: date('data_limite_venda'),
  ativo: boolean('ativo').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ENTIDADE COMPRA (relaciona Usuario com Ingresso)
export const compras = pgTable('compras', {
  id: serial('id').primaryKey(),
  usuarioId: integer('usuario_id').references(() => usuarios.id).notNull(),
  ingressoId: integer('ingresso_id').references(() => ingressos.id).notNull(),
  quantidade: integer('quantidade').notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pendente'),
  dataCompra: timestamp('data_compra').defaultNow().notNull(),
});

// ENTIDADE CHECKLIST (um-para-muitos com Evento)
export const checklists = pgTable('checklists', {
  id: serial('id').primaryKey(),
  eventoId: integer('evento_id').references(() => eventos.id, { onDelete: 'cascade' }).notNull(),
  tarefa: varchar('tarefa', { length: 255 }).notNull(),
  concluida: boolean('concluida').notNull().default(false),
  dataLimite: date('data_limite'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ENTIDADE ARQUIVO MÍDIA (um-para-muitos com Evento)
export const arquivosMidia = pgTable('arquivos_midia', {
  id: serial('id').primaryKey(),
  eventoId: integer('evento_id').references(() => eventos.id, { onDelete: 'cascade' }).notNull(),
  tipo: varchar('tipo', { length: 50 }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  descricao: varchar('descricao', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});



// RELAÇÕES (para uso no Drizzle)
export const eventosRelations = relations(eventos, ({ many, one }) => ({
  programacoes: many(programacoes),
  ingressos: many(ingressos),
  checklists: many(checklists),
  arquivosMidia: many(arquivosMidia),
  palestrantes: many(eventoPalestrantes),
  criador: one(usuarios, {
    fields: [eventos.criadoPor],
    references: [usuarios.id],
  }),
}));

export const usuariosRelations = relations(usuarios, ({ many }) => ({
  eventos: many(eventos),
  compras: many(compras),
}));

export const palestrantesRelations = relations(palestrantes, ({ many }) => ({
  eventos: many(eventoPalestrantes),
}));

export const eventoPalestrantesRelations = relations(eventoPalestrantes, ({ one }) => ({
  evento: one(eventos, {
    fields: [eventoPalestrantes.eventoId],
    references: [eventos.id],
  }),
  palestrante: one(palestrantes, {
    fields: [eventoPalestrantes.palestranteId],
    references: [palestrantes.id],
  }),
}));

export const ingressosRelations = relations(ingressos, ({ one, many }) => ({
  evento: one(eventos, {
    fields: [ingressos.eventoId],
    references: [eventos.id],
  }),
  compras: many(compras),
}));

export const comprasRelations = relations(compras, ({ one }) => ({
  usuario: one(usuarios, {
    fields: [compras.usuarioId],
    references: [usuarios.id],
  }),
  ingresso: one(ingressos, {
    fields: [compras.ingressoId],
    references: [ingressos.id],
  }),
}));

export * from './relations';
