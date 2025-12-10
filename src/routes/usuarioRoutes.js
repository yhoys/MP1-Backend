import express from "express";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuarioController.js";
import { protect, authorize } from "../middleware/auth.js";
import { auditLog } from "../middleware/audit.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("ver_usuarios"), getUsuarios)
  .post(protect, authorize("crear_usuarios"), auditLog, createUsuario);

router
  .route("/:id")
  .get(protect, authorize("ver_usuarios"), getUsuarioById)
  .put(protect, authorize("editar_usuarios"), auditLog, updateUsuario)
  .delete(protect, authorize("eliminar_usuarios"), auditLog, deleteUsuario);

export default router;
