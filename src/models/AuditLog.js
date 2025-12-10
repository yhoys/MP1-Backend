import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AuditLog = sequelize.define('AuditLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  entidad: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  accion: {
    type: DataTypes.ENUM('CREATE', 'UPDATE', 'DELETE'),
    allowNull: false
  },
  entidadId: {
    type: DataTypes.STRING(100),
    field: 'entidad_id'
  },
  usuarioId: {
    type: DataTypes.UUID,
    field: 'usuario_id'
  },
  datosAnteriores: {
    type: DataTypes.JSON,
    field: 'datos_anteriores'
  },
  datosNuevos: {
    type: DataTypes.JSON,
    field: 'datos_nuevos'
  },
  ip: {
    type: DataTypes.STRING(45)
  },
  userAgent: {
    type: DataTypes.TEXT,
    field: 'user_agent'
  }
}, {
  tableName: 'audit_logs',
  timestamps: true,
  updatedAt: false
});

export default AuditLog;
