import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Configuración
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0"; // Escuchar en todas las interfaces

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.CORS_ORIGIN,
    ].filter(Boolean),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    message: "API REST - Sistema de Gestión de Usuarios",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      usuarios: "/api/usuarios",
      roles: "/api/roles",
      documentTypes: "/api/document-types",
      audit: "/api/audit",
    },
  });
});

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API funcionando correctamente" });
});

// Iniciar servidor
const startServer = async () => {
  try {
    console.log("🔄 Conectando a PostgreSQL...");
    await connectDB();

    console.log("📦 Importando rutas...");
    const { default: authRoutes } = await import("./routes/authRoutes.js");
    const { default: usuarioRoutes } = await import(
      "./routes/usuarioRoutes.js"
    );
    const { default: roleRoutes } = await import("./routes/roleRoutes.js");
    const { default: documentTypeRoutes } = await import(
      "./routes/documentTypeRoutes.js"
    );
    const { default: auditRoutes } = await import("./routes/auditRoutes.js");

    // Rutas de la API
    app.use("/api/auth", authRoutes);
    app.use("/api/usuarios", usuarioRoutes);
    app.use("/api/roles", roleRoutes);
    app.use("/api/document-types", documentTypeRoutes);
    app.use("/api/audit", auditRoutes);

    // Manejo de errores
    app.use(notFound);
    app.use(errorHandler);

    // Iniciar servidor HTTP
    app.listen(PORT, HOST, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`📝 Ambiente: ${process.env.NODE_ENV}`);
      console.log(`💾 Base de datos: PostgreSQL`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
