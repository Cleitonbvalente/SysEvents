import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from '../config/database';

async function main() {
  console.log('🔄 Executando migrations...');
  await migrate(db, { migrationsFolder: './drizzle/migrations' });
  console.log('✅ Migrations concluídas!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Erro nas migrations:', err);
  process.exit(1);
});
