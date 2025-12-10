import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const DocumentType = sequelize.define('DocumentType', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  codigo: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  tipoAccion: {
    type: DataTypes.STRING(20)
  },
  usuarioAccion: {
    type: DataTypes.STRING(100)
  },
  fechaHoraEvento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'document_types',
  timestamps: true
});

export default DocumentType;
