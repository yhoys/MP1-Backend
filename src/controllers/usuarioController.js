import { Usuario, Role, DocumentType } from '../models/index.js';
import { Op } from 'sequelize';

export const getUsuarios = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', estado } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where[Op.or] = [
        { nombres: { [Op.iLike]: `%${search}%` } },
        { apellidos: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { numeroDocumento: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (estado !== undefined) {
      where.estado = estado === 'true';
    }

    const { count, rows: usuarios } = await Usuario.findAndCountAll({
      where,
      include: [
        { model: Role, as: 'rol' },
        { model: DocumentType, as: 'tipoDocumento' }
      ],
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      usuarios,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalUsuarios: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [
        { model: Role, as: 'rol' },
        { model: DocumentType, as: 'tipoDocumento' }
      ],
      attributes: { exclude: ['password'] }
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    
    const usuarioCreado = await Usuario.findByPk(usuario.id, {
      include: [
        { model: Role, as: 'rol' },
        { model: DocumentType, as: 'tipoDocumento' }
      ],
      attributes: { exclude: ['password'] }
    });

    res.status(201).json(usuarioCreado);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'El email o documento ya existe' });
    }
    res.status(400).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await usuario.update(req.body);

    const usuarioActualizado = await Usuario.findByPk(usuario.id, {
      include: [
        { model: Role, as: 'rol' },
        { model: DocumentType, as: 'tipoDocumento' }
      ],
      attributes: { exclude: ['password'] }
    });

    res.json(usuarioActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await usuario.update({ estado: false });

    res.json({ message: 'Usuario desactivado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
