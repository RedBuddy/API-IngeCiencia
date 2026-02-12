import sequelize from "./src/database/connection.js";
import { seedDatabase } from "./src/database/seed.js";

async function runSeed() {
  try {
    console.log("🌱 Iniciando seed de la base de datos...\n");
    await seedDatabase();
    console.log("\n✓ Seed completado exitosamente");
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Error durante el seed:", error.message);
    process.exit(1);
  }
}

runSeed();
