import { AuditLog } from '../models/index.js';

const getEntityName = (path) => {
  if (path.includes('/usuarios')) return 'Usuario';
  if (path.includes('/roles')) return 'Role';
  if (path.includes('/document-types')) return 'DocumentType';
  return 'Unknown';
};

const getAction = (method) => {
  if (method === 'POST') return 'CREATE';
  if (method === 'PUT' || method === 'PATCH') return 'UPDATE';
  if (method === 'DELETE') return 'DELETE';
  return 'READ';
};

export const auditLog = async (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    res.send = originalSend;

    if (res.statusCode >= 200 && res.statusCode < 300 && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const entidad = getEntityName(req.path);
      const accion = getAction(req.method);

      AuditLog.create({
        entidad,
        accion,
        entidadId: req.params.id || null,
        usuarioId: req.usuario?.id || null,
        datosAnteriores: req.originalData || null,
        datosNuevos: req.method !== 'DELETE' ? req.body : null,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent')
      }).catch(err => console.error('Error guardando auditoría:', err));
    }

    return res.send(data);
  };

  next();
};
