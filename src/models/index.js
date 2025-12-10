import Usuario from './Usuario.js';
import Role from './Role.js';
import DocumentType from './DocumentType.js';
import AuditLog from './AuditLog.js';

// Definir relaciones
Usuario.belongsTo(Role, { foreignKey: 'rolId', as: 'rol' });
Role.hasMany(Usuario, { foreignKey: 'rolId' });

Usuario.belongsTo(DocumentType, { foreignKey: 'tipoDocumentoId', as: 'tipoDocumento' });
DocumentType.hasMany(Usuario, { foreignKey: 'tipoDocumentoId' });

export { Usuario, Role, DocumentType, AuditLog };
