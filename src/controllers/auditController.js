import { AuditLog, Usuario } from '../models/index.js';

export const getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, entidad, accion } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (entidad) where.entidad = entidad;
    if (accion) where.accion = accion;

    const { count, rows: logs } = await AuditLog.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      logs,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalLogs: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
