import app from "./app.js";
import { syncDatabase } from "./database/index.js";

// Sincronizar la base de datos y luego iniciar el servidor
syncDatabase()
  .then(() => {
    app.listen(app.get("PORT"), () => {
      console.log(`Servidor escuchando en puerto ${app.get("PORT")}`);
    });
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
    process.exit(1);
  });
