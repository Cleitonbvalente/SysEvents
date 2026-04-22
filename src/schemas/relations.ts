import { relations } from 'drizzle-orm';
import { eventos, usuarios, palestrantes, eventoPalestrantes, ingressos, compras, programacoes, checklists, arquivosMidia } from './index';

// ========== RELAÇÕES ==========
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
