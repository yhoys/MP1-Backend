import jwt from 'jsonwebtoken';
import { Usuario, Role } from '../models/index.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.usuario = await Usuario.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Role, as: 'rol' }]
      });

      if (!req.usuario || !req.usuario.estado) {
        return res.status(401).json({ message: 'No autorizado - usuario inactivo' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'No autorizado - token inválido' });
    }
  } else {
    return res.status(401).json({ message: 'No autorizado - no hay token' });
  }
};

export const authorize = (...permisos) => {
  return (req, res, next) => {
    if (!req.usuario || !req.usuario.rol) {
      return res.status(403).json({ message: 'Acceso denegado - sin rol' });
    }

    const tienePermiso = permisos.some(permiso => 
      req.usuario.rol.permisos.includes(permiso)
    );

    if (!tienePermiso) {
      return res.status(403).json({ 
        message: 'Acceso denegado - permisos insuficientes' 
      });
    }

    next();
  };
};
