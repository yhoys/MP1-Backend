import express from "express";
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";
import { protect, authorize } from "../middleware/auth.js";
import { auditLog } from "../middleware/audit.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("ver_roles"), getRoles)
  .post(protect, authorize("crear_roles"), auditLog, createRole);

router
  .route("/:id")
  .get(protect, authorize("ver_roles"), getRoleById)
  .put(protect, authorize("editar_roles"), auditLog, updateRole)
  .delete(protect, authorize("eliminar_roles"), auditLog, deleteRole);

export default router;
