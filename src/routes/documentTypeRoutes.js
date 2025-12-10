import express from "express";
import {
  getDocumentTypes,
  getDocumentTypeById,
  createDocumentType,
  updateDocumentType,
  deleteDocumentType,
} from "../controllers/documentTypeController.js";
import { protect, authorize } from "../middleware/auth.js";
import { auditLog } from "../middleware/audit.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("ver_tipos_documento"), getDocumentTypes)
  .post(protect, authorize("crear_tipos_documento"), auditLog, createDocumentType);

router
  .route("/:id")
  .get(protect, authorize("ver_tipos_documento"), getDocumentTypeById)
  .put(protect, authorize("editar_tipos_documento"), auditLog, updateDocumentType)
  .delete(protect, authorize("eliminar_tipos_documento"), auditLog, deleteDocumentType);

export default router;
